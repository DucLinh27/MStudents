require("dotenv").config();
import { Redis } from "ioredis";
// Thay thế các thông tin sau đây bằng thông tin từ Redis Labs
const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_ENDPOINT,
  password: process.env.REDIS_PASSWORD,
  dnsLookup: (address, callback) => {
    require("dns").lookup(address, { timeout: 10000 }, callback);
  },
});
// Middleware sử dụng Redis cho caching
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  // Check if the data is in Redis
  redisClient.get(key, (err, result) => {
    if (result) {
      // If it is, use the data from Redis
      res.send(result);
    } else {
      // If not, proceed with the request and save the data in Redis
      res.sendResponse = res.send;
      res.send = (body) => {
        redisClient.set(key, body, "EX", 60 * 60); // Set an expiration time for the cache
        res.sendResponse(body);
        // Reset res.send to its original function after using it
        res.send = res.sendResponse;
      };
      next();
    }
  });
};
// function cacheMiddleware(duration) {
//   return (req, res, next) => {
//     const key = "__express__" + req.originalUrl || req.url;
//     const cachedBody = cache.get(key);

//     if (cachedBody) {
//       return res.json(cachedBody);
//     } else {
//       res.sendResponse = res.json;
//       res.json = (body) => {
//         cache.put(key, body, duration * 1000); // Convert seconds to milliseconds
//         res.sendResponse(body);
//       };
//       next();
//     }
//   };
// }

module.exports = cacheMiddleware;
