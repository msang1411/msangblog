const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");

const authorize = (code, action) => {
  return (req, res, next) => {
    try {
      if (
        req.user.roles.some((role) => role.name === "admin") ||
        req.user.permissions.some((perm) => perm.code === "ADMIN")
      ) {
        return next();
      }

      if (
        req.user.permissions.some(
          (perm) =>
            perm.code === code &&
            Array.isArray(perm.actions) &&
            perm.actions.some((act) => act.action === action)
        )
      )
        return next();

      if (!req.user.roles || req.user.roles.length === 0)
        return res
          .status(statusCode.UNAUTHORIZED)
          .json({ message: "unauthorize" });

      const hasPermission = req.user.roles.permissions.some(
        (perm) =>
          perm.code === code &&
          Array.isArray(perm.actions) &&
          perm.actions.some((act) => act.action === action)
      );

      if (!hasPermission) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .json({ message: "unauthorize" });
      }
      return next();
    } catch (error) {
      return next(
        new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message)
      );
    }
  };
};

module.exports = {
  authorize,
};
