require("dotenv").config(); // giup chayj dc dong process.env
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/conectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import passport from "passport";
import jwt from "jsonwebtoken";
import paypal from "paypal-rest-sdk";
let app = express();
app.use(cookieParser());
app.use(cors({ origin: true }));

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AclsyktkK-QOw-GHnMtuC0E1o2j-GcwgkjCe28yVu2VweLCsuv6HVXeiOAhVyyw7KgFl0CAyEraeAQK3",
  client_secret: "PAYPAL_SCRET",
});
// Cài đặt Passport và sử dụng session
app.use(
  require("express-session")({
    secret: "duclinhjwt",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Khởi tạo Passport
app.use(passport.initialize());

//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Add Redis
const redis = require("redis");
const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});
// ... (other imports)
const swaggerUi = require("swagger-ui-express");
const specs = require("./docs/swagger"); // Import the Swagger configuration

// Rate limiting configuration
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // Limit each IP to 10 requests per windowMs
// });

// // Apply rate limiting to all requests
// app.use(limiter);

//cookieParser
app.get("/api/check-cookie", (req, res) => {
  if (req.cookies.jwt) {
    res.send("JWT cookie is set!");
  } else {
    res.send("JWT cookie is not set.");
  }
});

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 3000; //Port === undefined => Port = 6060
app.use((req, res, next) => {
  return res.status(404).send({
    errCode: 404,
    message: "API not found",
  });
});
app.listen(port, () => {
  //callback
  console.log("Backend Nodejs is running on the port: " + port);
});
