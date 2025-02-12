const statusCode = require("../utils/statusCode");
const adminService = require("../services/admin.service");

const changePassword = async (req, res, next) => {
  try {
    const result = await adminService.changePassword(
      req.value.params.id,
      req.value.data.oldPassword,
      req.value.data.newPassword
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

const createAdmin = async (req, res, next) => {
  try {
    const result = await adminService.createAdmin(req.value.data);

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

const deleteAdmin = async (req, res, next) => {
  try {
    const result = await adminService.deleteAdmin(req.value.params.id);
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

const getAdminById = async (req, res, next) => {
  try {
    const result = await adminService.getAdminById(req.value.params.id);

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

const getAdminList = async (req, res, next) => {
  try {
    const result = await adminService.getAdminList(
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

const updateAdmin = async (req, res, next) => {
  try {
    const result = await adminService.updateAdmin(
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
  changePassword,
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdminList,
  updateAdmin,
};
