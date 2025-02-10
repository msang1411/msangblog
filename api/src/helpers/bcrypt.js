const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");

const bcryptHash = async (data) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Generate a password hash (salt + hash)
    const dataHash = await bcrypt.hash(data, salt);

    return dataHash;
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

const compareHash = async (data, hashed) => {
  try {
    return await bcrypt.compare(data, hashed);
  } catch (error) {
    throw new ApiError(statusCode.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  bcryptHash,
  compareHash,
};
