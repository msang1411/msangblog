const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const redisClient = require("../db/redis");

const setCache = async (key, value, ttl = 30 * 24 * 60 * 60) => {
  try {
    if (typeof key !== "string") {
      throw new ApiError(
        statusCode.BAD_REQUEST,
        `Key must be a string, received: ${typeof key}`
      );
    }
    if (typeof ttl !== "number") {
      throw new ApiError(
        statusCode.BAD_REQUEST,
        `TTL must be a number, received: ${typeof ttl}`
      );
    }
    if (value === undefined || value === null) {
      throw new ApiError(
        statusCode.BAD_REQUEST,
        "Value cannot be undefined or null"
      );
    }

    await redisClient.setEx(key, ttl, JSON.stringify(value));
    // console.log(`✔️ Cached: ${key}`);
  } catch (err) {
    console.error("❌ Error setting cache:", err);
  }
};

const getCache = async (key) => {
  try {
    if (typeof key !== "string") {
      throw new ApiError(
        statusCode.BAD_REQUEST,
        `Key must be a string, received: ${typeof key}`
      );
    }

    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("❌ Error getting cache:", err);
    return null;
  }
};

module.exports = { setCache, getCache };
