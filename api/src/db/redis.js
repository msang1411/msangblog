const redis = require("redis");
require("dotenv").config();

const host = process.env.REDIS_HOST || "0.0.0.0:6379";

const redisClient = redis.createClient({
  url: `redis://${host}`,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});

redisClient.on("connect", () => {
  // console.log("✅ Connected to Redis");
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("❌ Redis Connection Error:", err);
  }
})();

module.exports = redisClient;
