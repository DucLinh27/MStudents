// require("dotenv").config();
// import { Redis } from "ioredis";
// // Thay thế các thông tin sau đây bằng thông tin từ Redis Labs
// const redisClient = new Redis({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_ENDPOINT,
//   password: process.env.REDIS_PASSWORD,
//   dnsLookup: (address, callback) => {
//     require("dns").lookup(address, { timeout: 1000 }, callback);
//   },
// });
// // Middleware sử dụng Redis cho caching
// // function updateData(key, newData) {
// //   // Update the data in the database
// //   database.update(key, newData, (err) => {
// //     if (err) {
// //       // Handle error...
// //     } else {
// //       // If the update was successful, invalidate the cache
// //       redisClient.del(key);
// //     }
// //   });
// // }

// function cacheMiddleware(req, res, next) {
//   const key = req.originalUrl;

//   // Check if the data is in Redis
//   redisClient.get(key, (err, result) => {
//     if (result) {
//       // If it is, use the data from Redis
//       res.send(JSON.parse(result));
//     } else {
//       // If not, fetch the data from the database
//       database.get(key, (err, result) => {
//         if (err) {
//           // Handle error...
//         } else {
//           // Save the data in Redis and send the response
//           redisClient.set(key, JSON.stringify(result), "EX", 60 * 60);
//           res.send(result);
//         }
//       });
//     }
//   });
// }
// // const updateRedis = async (key, newData) => {
// //   try {
// //     // Kiểm tra xem dữ liệu đã tồn tại trong Redis hay chưa
// //     const isKeyExist = await redis.exists(key);

// //     if (isKeyExist) {
// //       // Nếu tồn tại, xóa dữ liệu cũ
// //       await redis.del(key);
// //     }

// //     // Thêm dữ liệu mới vào Redis
// //     await redis.set(key, JSON.stringify(newData));

// //     console.log(`Dữ liệu trong Redis đã được cập nhật cho key: ${key}`);
// //   } catch (error) {
// //     console.error("Lỗi khi cập nhật dữ liệu trong Redis:", error);
// //   }
// // };
// // function cacheMiddleware(duration) {
// //   return (req, res, next) => {
// //     const key = "__express__" + req.originalUrl || req.url;
// //     const cachedBody = cache.get(key);

// //     if (cachedBody) {
// //       return res.json(cachedBody);
// //     } else {
// //       res.sendResponse = res.json;
// //       res.json = (body) => {
// //         cache.put(key, body, duration * 1000); // Convert seconds to milliseconds
// //         res.sendResponse(body);
// //       };
// //       next();
// //     }
// //   };
// // }

// module.exports = cacheMiddleware;
"use strict";