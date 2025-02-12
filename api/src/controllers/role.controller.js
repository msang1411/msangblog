const statusCode = require("../utils/statusCode");
const roleService = require("../services/role.service");

const createRole = async (req, res, next) => {
  try {
    const result = await roleService.createRole(req.value.data);

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

const deleteRole = async (req, res, next) => {
  try {
    const result = await roleService.deleteRole(req.value.params.id);
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

const getRoleById = async (req, res, next) => {
  try {
    const result = await roleService.getRoleById(req.value.params.id);

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

const getRoleList = async (req, res, next) => {
  try {
    const result = await roleService.getRoleList(
      req.value.query.page,
      req.value.query.limit,
      req.value.filters
    );

    return res.status(statusCode.OK).json({
      message: result.message,
      page: result.page,
      limit: result.limit,
      totalCount: result.totalCount,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const result = await roleService.updateRole(
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
  createRole,
  deleteRole,
  getRoleById,
  getRoleList,
  updateRole,
};
