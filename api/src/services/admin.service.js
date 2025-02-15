const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Admin = require("../models/Admin");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const bcrypt = require("../helpers/bcrypt");
const {
  signAccessToken,
  signRefreshToken,
} = require("../authentication/authentication");

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
        populate: {
          path: "permissions",
          select: "name code actions",
        },
        select: "name permission",
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

    let adminList;
    if (page === 0 || limit === 0)
      adminList = await Admin.find(queryFilters)
        .select("-password")
        .populate({
          path: "roles",
          populate: {
            path: "permissions",
            select: "name code actions",
          },
          select: "name permission",
        })
        .populate("permissions", "name code actions")
        .lean();
    else
      adminList = await Admin.find(queryFilters)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: "roles",
          populate: {
            path: "permissions",
            select: "name code actions",
          },
          select: "name permission",
        })
        .populate("permissions", "name code actions")
        .lean();

    return {
      message: `Get admin list successfully!`,
      count: adminList.length,
      data: adminList,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const resetPassword = async (userId, newPassword) => {
  try {
    const account = await Admin.findOne({
      _id: userId,
      isDelete: false,
    });

    if (!account)
      return {
        status: false,
        message: "account not exist!",
      };

    const passwordHashed = await bcrypt.bcryptHash(newPassword);
    account.password = passwordHashed;

    await account.save();

    return {
      status: true,
      message: "account has been reset password!",
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const signIn = async (username, password) => {
  try {
    const account = await Admin.findOne({
      username,
      isDelete: false,
    })
      .populate({
        path: "roles",
        populate: {
          path: "permissions",
          select: "name code actions",
        },
        select: "name permission",
      })
      .populate("permissions", "name code actions")
      .lean();

    if (!account) {
      return {
        status: false,
        message: "account not exist!",
      };
    }

    const isValid = await bcrypt.compareHash(password, account.password);
    if (!isValid) throw new ApiError(statusCode.UNAUTHORIZED, "wrong password");
    delete account.password;

    const accessToken = signAccessToken(account._id);
    const refreshToken = signRefreshToken(account._id);

    return {
      status: true,
      accessToken,
      refreshToken,
      user: account,
      message: "login success!",
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
    });

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
        populate: {
          path: "permissions",
          select: "name code actions",
        },
        select: "name permission",
      })
      .populate("permissions")
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
  resetPassword,
  signIn,
  updateAdmin,
};
