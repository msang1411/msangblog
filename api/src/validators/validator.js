const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");

const dataValidate = (schema) => {
  return (req, res, next) => {
    if (!req.body || !req.body.data)
      return next(new ApiError(statusCode.BAD_REQUEST, "Invalid request"));
    const { value, error } = schema.validate(req.body.data);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(statusCode.BAD_REQUEST, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.data = value;
      next();
    }
  };
};

const metadataValidate = (schema) => {
  return (req, res, next) => {
    if (!req.body || !req.body.data)
      return next(new ApiError(statusCode.BAD_REQUEST, "Invalid request"));
    const { value, error } = schema.validate(JSON.parse(req.body.data));
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(statusCode.BAD_REQUEST, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.data = value;
      next();
    }
  };
};

const filtersValidate = (schema) => {
  return (req, res, next) => {
    if (!req.body.filters)
      return next(
        new ApiError(statusCode.BAD_REQUEST, "Filters are undefined")
      );

    const { value, error } = schema.validate(req.body.filters);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(statusCode.BAD_REQUEST, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.filters = value;
      next();
    }
  };
};

const paramsValidate = (schema) => {
  return (req, res, next) => {
    if (!req.params)
      return next(new ApiError(statusCode.BAD_REQUEST, "Params are undefined"));

    const { value, error } = schema.validate(req.params);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(statusCode.BAD_REQUEST, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.params = value;
      next();
    }
  };
};

const queryValidate = (schema) => {
  return (req, res, next) => {
    if (!req.query)
      return next(
        new ApiError(statusCode.BAD_REQUEST, "Query params are undefined")
      );

    const { value, error } = schema.validate(req.query);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(new ApiError(statusCode.BAD_REQUEST, errorMessage));
    } else {
      if (!req.value) req.value = {};
      req.value.query = value;
      next();
    }
  };
};

module.exports = {
  dataValidate,
  metadataValidate,
  filtersValidate,
  paramsValidate,
  queryValidate,
};
