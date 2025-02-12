const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Admin = require("../models/Admin");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const bcrypt = require("../helpers/bcrypt");

const changePassword = async (id, oldPassword, newPassword) => {
  try {
    const admin = await Admin.findOne({
      _id: id,
      isDelete: false,
    });

    if (!admin)
      return {
        status: false,
        message: "Account does not exist or has already been deleted!",
      };

    const isValid = await bcrypt.compareHash(admin.password, oldPassword);
    if (!isValid)
      throw new ApiError(statusCode.NOT_IMPLEMENTED, "wrong password");

    const passwordHashed = await bcrypt.bcryptHash(newPassword);
    admin.password = passwordHashed;
    await admin.save();

    return { status: true, message: "Account has been changed password!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const createAdmin = async (admin) => {
  try {
    const existedAdmin = await Admin.findOne({
      username: admin.username,
    }).lean();
    if (existedAdmin) {
      if (existedAdmin.isDelete)
        return {
          status: false,
          message: "Account has been existed but is in deleted state!",
        };
      return { status: false, message: "Account has been existed!" };
    }

    if (admin.roles && admin.roles.length > 0) {
      const checkRoles = await Role.find({
        _id: { $in: admin.roles },
      }).lean();
      if (checkRoles.length !== admin.roles.length)
        return { status: false, message: "Some role IDs do not exist!" };
    }

    if (admin.permissions && admin.permissions.length > 0) {
      const checkPermissions = await Permission.find({
        _id: { $in: admin.permissions },
      }).lean();
      if (checkPermissions.length !== admin.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    const passwordHashed = await bcrypt.bcryptHash(admin.password);
    admin.password = passwordHashed;
    // admin.createAt = new Date();
    await Admin.create(admin);

    return { status: true, message: "Account created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteAdmin = async (id) => {
  try {
    const admin = await Admin.findOne({
      _id: id,
      isDelete: false,
    });

    if (!admin)
      return {
        status: false,
        message: "Account does not exist or has already been deleted!",
      };

    admin.isDelete = true;
    await admin.save();

    return { status: true, message: "Account has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminById = async (id) => {
  try {
    const admin = await Admin.findOne({ _id: id, isDelete: false })
      .select("-password")
      .populate({
        path: "roles",
        model: "role",
      })
      .populate({
        path: "permissions",
        model: "permission",
      })
      .lean();
    if (!admin) return { status: false, message: "Admin does not exist!" };

    return { status: true, message: "Get admin successfully!", data: admin };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAdminList = async (page, limit, filters) => {
  try {
    const queryFilters = { ...filters };

    // because filtering an ID, it needs to be converted to an array to match
    // the Admin model
    if (filters.roleId) {
      queryFilters.roles = { $in: filters.roleId };
      delete queryFilters.roleId;
    }
    if (filters.permissionId) {
      queryFilters.permissions = { $in: filters.permissionId };
      delete queryFilters.permissionId;
    }

    const totalCountPromise = Admin.countDocuments(filters);

    let adminListPromise;
    if (page === 0 || limit === 0)
      adminListPromise = Admin.find(queryFilters)
        .select("-password")
        .populate("roles", "name")
        .populate("permissions", "name code actions")
        .lean();
    else
      adminListPromise = Admin.find(queryFilters)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("roles", "name")
        .populate("permissions", "name code actions")
        .lean();

    const [totalCount, adminList] = await Promise.all([
      totalCountPromise,
      adminListPromise,
    ]);

    return {
      message: `Get admin list by limit: ${limit}, page: ${page} successfully!`,
      page,
      limit,
      totalCount,
      data: adminList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateAdmin = async (id, admin) => {
  try {
    const existedAdmin = await Admin.findOne({
      _id: id,
      isDelete: false,
    }).select("-password");

    if (!existedAdmin)
      return { status: false, message: "Admin doesn't exist!" };

    if (admin.roles && admin.roles.length > 0) {
      const checkRoles = await Role.find({
        _id: { $in: admin.roles },
      }).lean();
      if (checkRoles.length !== admin.roles.length)
        return { status: false, message: "Some role IDs do not exist!" };
    }

    if (admin.permissions && admin.permissions.length > 0) {
      const checkPermissions = await Permission.find({
        _id: { $in: admin.permissions },
      }).lean();
      if (checkPermissions.length !== admin.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    Object.assign(existedAdmin, admin);
    const updatedAdmin = await existedAdmin.save();

    const populatedAdmin = await Admin.findById(updatedAdmin._id)
      .populate({
        path: "roles",
        model: "admin_role",
      })
      .populate({
        path: "permissions",
        model: "admin_permission",
      })
      .select("-password")
      .lean();

    return {
      status: true,
      message: "Admin updated successfully",
      data: populatedAdmin,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  changePassword,
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdminList,
  updateAdmin,
};
