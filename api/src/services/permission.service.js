const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const Admin = require("../models/Admin");

const createPermission = async (permission) => {
  try {
    const existedPermission = await Permission.findOne({
      $or: [{ name: permission.name }, { code: permission.code }],
    }).lean();

    if (existedPermission) {
      if (existedPermission.isDelete)
        return {
          status: false,
          message:
            "Permission with this name or code already exists but is in deleted state!",
        };
      return {
        status: false,
        message: "Permission with this name or code already exists.",
      };
    }

    await Permission.create(permission);
    return { status: true, message: "Permission created successfully!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deletePermission = async (id) => {
  try {
    const permission = await Permission.findOne({
      _id: id,
      isDelete: false,
    });

    if (!permission)
      return {
        status: false,
        message: "Permission does not exist or has already been deleted!",
      };

    const deletePermissionAdminPromise = Admin.updateMany(
      { permissions: id },
      { $pull: { permissions: id } }
    );
    const deletePermissionRolePromise = Role.updateMany(
      { permissions: id },
      { $pull: { permissions: id } }
    );

    await Promise.all([
      deletePermissionAdminPromise,
      deletePermissionRolePromise,
    ]);

    permission.isDelete = true;
    await permission.save();

    return { status: true, message: "Permission has been deleted!" };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getPermissionById = async (id) => {
  try {
    const permission = await Permission.findOne({
      _id: id,
      isDelete: false,
    }).lean();
    if (!permission)
      return { status: false, message: "Permission does not exist!" };

    return {
      status: true,
      message: "Get Permission successfully!",
      data: permission,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getPermissionList = async (page, limit, filters) => {
  try {
    const totalCountPromise = Permission.countDocuments(filters);

    let permissionListPromise;
    if (page === 0 || limit === 0) {
      permissionListPromise = Permission.find(filters).lean();
    } else {
      permissionListPromise = Permission.find(filters)
        .skip(page - 1 * limit)
        .limit(limit)
        .lean();
    }

    const [totalCount, permissionList] = await Promise.all([
      totalCountPromise,
      permissionListPromise,
    ]);

    return {
      message: `Get permission list successfully!`,
      data: permissionList,
      count: totalCount,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updatePermission = async (id, permission) => {
  try {
    const existedPermission = await Permission.findOne({
      _id: id,
      isDelete: false,
    });
    if (!existedPermission)
      return { status: false, message: "Permission doesn't exist!" };

    Object.assign(existedPermission, permission);
    const updatedPermission = await existedPermission.save();

    return {
      status: true,
      message: "Permission updated successfully",
      data: updatedPermission,
    };
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createPermission,
  deletePermission,
  getPermissionById,
  getPermissionList,
  updatePermission,
};
