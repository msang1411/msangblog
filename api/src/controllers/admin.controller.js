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

const checkAccessTokenExpired = async (req, res, next) => {
  try {
    const result = await adminService.checkAccessTokenExpired(
      req.headers.authorization
    );

    if (result.isExpired)
      return res.status(statusCode.UNAUTHORIZED).json({
        isExpired: result.isExpired,
        message: result.message,
      });

    return res.status(statusCode.OK).json({
      isExpired: result.isExpired,
      message: result.message,
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
      page: req.value.query.page,
      limit: req.value.query.limit,
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return next(new ApiError(statusCode.UNAUTHORIZED, "Unauthorized"));

    const result = await adminService.logout(req.headers.authorization);
    return res.status(statusCode.OK).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return next(new ApiError(statusCode.UNAUTHORIZED, "Unauthorized"));

    const result = await adminService.refreshToken(req.headers.authorization);
    return res.status(statusCode.OK).json({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await adminService.resetPassword(
      req.value.data.userId,
      req.value.data.newPassword
    );

    if (!result.status)
      return res.status(statusCode.UNAUTHORIZED).json({
        message: result.message,
      });

    return res.status(statusCode.OK).json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const result = await adminService.signIn(
      req.value.data.username,
      req.value.data.password
    );

    if (!result.status)
      return res.status(statusCode.UNAUTHORIZED).json({
        message: result.message,
      });

    return res.status(statusCode.OK).json({
      message: result.message,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
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
  checkAccessTokenExpired,
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdminList,
  logout,
  refreshToken,
  resetPassword,
  signIn,
  updateAdmin,
};
