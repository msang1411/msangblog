const statusCode = require("../utils/statusCode");
const permissionService = require("../services/permission.service");

const createPermission = async (req, res, next) => {
  try {
    const result = await permissionService.createPermission(req.value.data);

    if (!result.status)
      return res.status(statusCode.CONFLICT).json({
        message: result.message,
      });
    return res.status(statusCode.CREATED).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const deletePermission = async (req, res, next) => {
  try {
    const result = await permissionService.deletePermission(
      req.value.params.id
    );
    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.ACCEPTED).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const getPermissionById = async (req, res, next) => {
  try {
    const result = await permissionService.getPermissionById(
      req.value.params.id
    );

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getPermissionList = async (req, res, next) => {
  try {
    const result = await permissionService.getPermissionList(
      req.value.query.page,
      req.value.query.limit,
      req.value.filters
    );

    return res.status(statusCode.OK).json({
      message: result.message,
      page: req.value.query.page,
      limit: req.value.query.limit,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updatePermission = async (req, res, next) => {
  try {
    const result = await permissionService.updatePermission(
      req.value.params.id,
      req.value.data
    );

    if (!result.status)
      return res.status(statusCode.NOT_FOUND).json({
        message: result.message,
      });
    return res.status(statusCode.OK).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPermission,
  deletePermission,
  getPermissionById,
  getPermissionList,
  updatePermission,
};
