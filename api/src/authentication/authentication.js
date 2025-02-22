const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../configs/index");
const JWT = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Admin = require("../models/Admin");

const signAccessToken = (userId) => {
  try {
    return JWT.sign(
      {
        sub: userId,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3 days",
      }
    );
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const signRefreshToken = (userId) => {
  try {
    return JWT.sign(
      {
        sub: userId,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30 days",
      }
    );
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const verifyAccessToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return next(new ApiError(statusCode.UNAUTHORIZED, "Unauthorized"));
    const token = req.headers.authorization.split(" ")[1];

    // start verify token
    const payload = await new Promise((resolve, reject) => {
      JWT.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            reject(new ApiError(statusCode.UNAUTHORIZED, "Unauthorized"));
          } else {
            reject(new ApiError(statusCode.UNAUTHORIZED, "token expired"));
          }
        } else {
          resolve(payload);
        }
      });
    });

    req.user = await Admin.findById(payload.sub)
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

    if (!req.user)
      return next(new ApiError(statusCode.NOT_FOUND, "account was deleted"));

    next();
  } catch (error) {
    next(new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message));
  }
};

const isAccessTokenExpired = async (bearerToken) => {
  const token = bearerToken.split(" ")[1];
  return await new Promise((resolve, reject) => {
    JWT.verify(token, ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        // Another error
        if (err.name === "JsonWebTokenError") {
          reject(new ApiError(statusCode.INTERNAL_SERVER_ERROR, err.message));
        }
        // Error token expired
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          reject(new ApiError(statusCode.UNAUTHORIZED, "Unauthorized"));
        } else {
          reject(new ApiError(statusCode.UNAUTHORIZED, "token expired"));
        }
      } else {
        resolve(payload);
      }
    });
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  isAccessTokenExpired,
  verifyRefreshToken,
};
