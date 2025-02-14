const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Admin = require("../models/Admin");

const createRole = async (role) => {
  try {
    const existedRole = await Role.findOne({
      name: role.name,
    }).lean();
    if (existedRole) {
      if (existedRole.isDelete)
        return {
          status: false,
          message: "Role has been existed but is in deleted state!",
        };
      return { status: false, message: "Role has been existed!" };
    }

    if (role.permissions && role.permissions.length > 0) {
      const checkPermissions = await Permission.find({
        _id: { $in: role.permissions },
      }).lean();

      if (checkPermissions.length !== role.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    role.createAt = new Date();
    role.isDelete = false;
    await Role.create(role);

    return { status: true, message: "Role created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteRole = async (id) => {
  try {
    const role = await Role.findOne({
      _id: id,
      isDelete: false,
    });

    if (!role)
      return {
        status: false,
        message: "Role does not exist or has already been deleted!",
      };

    const checkAdminUsing = await Admin.findOne({
      roles: id,
      isDelete: false,
    }).lean();

    if (checkAdminUsing)
      return {
        status: false,
        message: "Role having admin use!",
      };

    role.isDelete = true;
    await role.save();

    return { status: true, message: "Role has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getRoleById = async (id) => {
  try {
    const role = await Role.findOne({
      _id: id,
      isDelete: false,
    })
      .populate({
        path: "permissions",
        model: "permission",
      })
      .lean();
    if (!role) return { status: false, message: "Role does not exist!" };

    return {
      status: true,
      message: "Get role successfully!",
      data: role,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getRoleList = async (page, limit, filters) => {
  try {
    const totalCountPromise = Role.countDocuments(filters);

    let roleListPromise;
    if (page === 0 || limit === 0) {
      roleListPromise = Role.find(filters).populate("permissions").lean();
    } else {
      roleListPromise = Role.find(filters)
        .skip(page - 1 * limit)
        .limit(limit)
        .populate("permissions")
        .lean();
    }

    const [totalCount, roleList] = await Promise.all([
      totalCountPromise,
      roleListPromise,
    ]);

    return {
      message: `Get role list successfully!`,
      data: roleList,
      count: totalCount,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateRole = async (id, role) => {
  try {
    const existedRole = await Role.findOne({
      _id: id,
      isDelete: false,
    });
    if (!existedRole) return { status: false, message: "Role doesn't exist!" };

    if (role.permissions && role.permissions.length > 0) {
      const checkPermissions = await Permission.find({
        _id: { $in: role.permissions },
      }).lean();
      if (checkPermissions.length !== role.permissions.length)
        return { status: false, message: "Some permission IDs do not exist!" };
    }

    Object.assign(existedRole, role);
    const updatedRole = await existedRole.save();

    const populatedRole = await Role.findById(updatedRole._id)
      .populate({
        path: "permissions",
        model: "permission",
      })
      .lean();

    return {
      status: true,
      message: "Role updated successfully",
      data: populatedRole,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createRole,
  deleteRole,
  getRoleById,
  getRoleList,
  updateRole,
};
