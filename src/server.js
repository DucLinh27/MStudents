require("dotenv").config(); // giup chayj dc dong process.env
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initUsersRoutes from "./route/usersRoute";
import initCoursesRoutes from "./route/coursesRoute";
import initClassesRoutes from "./route/classesRoute";
import initOrdersRoutes from "./route/ordersRoute";
import initPaymentsRoutes from "./route/paymentsRoute";
import initStudentsRoutes from "./route/studentsRoute";
import initTeachersRoutes from "./route/teachersRoute";
import initVideosRoutes from "./route/videoRoute";
import connectDB from "./config/conectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import passport from "passport";
import jwt from "jsonwebtoken";
import paypal from "paypal-rest-sdk";
import { uploadCloud } from "./middleware/uploader";
import cloudinary from "cloudinary";
import multer from "multer";
let app = express();
app.use(cookieParser());
app.use(cors({ origin: true }));
// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dyfbye716",
  api_key: "661796382489326",
  api_secret: "J-lQnSxVlwfEMjyGTXSJ0dyVnQA",
});
// Cấu hình Multer để xử lý tải lên
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Định nghĩa endpoint xử lý tải lên ảnh
app.post("/upload/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  // Tải lên ảnh lên Cloudinary
  cloudinary.uploader
    .upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Trả về thông tin về ảnh đã tải lên
      res.json({ public_id: result.public_id, url: result.secure_url });
    })
    .end(req.file.buffer);
});

// Định nghĩa endpoint xử lý tải lên video
app.post("/upload/video", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  // Tải lên video lên Cloudinary
  cloudinary.uploader
    .upload_stream({ resource_type: "video" }, (error, result) => {
      if (error) {
        console.error("Error uploading video to Cloudinary:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Trả về thông tin về video đã tải lên
      res.json({ public_id: result.public_id, url: result.secure_url });
    })
    .end(req.file.buffer);
});

//congif paypal
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

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

//config app

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// const Redis = require("ioredis");
// const redis = new Redis();

// // Sử dụng Redis, ví dụ:
// redis.set("key", "value");
// redis.get("key", function (err, result) {
//   console.log(result); // In ra 'value'
// });
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

// Endpoint to fetch YouTube videos
app.get("/api/youtube/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const apiKey = "AIzaSyDfIXLdRaYLXIuWgEQVrTApJ4yObk94qFA"; // Replace with your API Key
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${searchTerm}&key=${apiKey}`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching YouTube videos:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

viewEngine(app);
initUsersRoutes(app);
initCoursesRoutes(app);
initOrdersRoutes(app);
initPaymentsRoutes(app);
initStudentsRoutes(app);
initTeachersRoutes(app);
initClassesRoutes(app);
initVideosRoutes(app);
connectDB();

let port = process.env.PORT || 3000;
app.use((req, res, next) => {
  return res.status(404).send({
    errCode: 404,
    message: "API not found",
  });
});
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
