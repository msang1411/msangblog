require("dotenv").config();
const statusCode = require("../utils/statusCode");

const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = statusCode.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || "something wrong!",
    stack: err.stack,
  };

  if (process.env.BUILD_MODE !== "development") delete responseError.stack;

  return res.status(err.statusCode).json(responseError);
};

module.exports = { errorHandlingMiddleware };
