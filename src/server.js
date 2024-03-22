require("dotenv").config(); // giup chayj dc dong process.env
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initUsersRoutes from "./route/usersRoute";
import initCoursesRoutes from "./route/coursesRoute";
import initOrdersRoutes from "./route/ordersRoute";
import initPaymentsRoutes from "./route/paymentsRoute";
import initStudentsRoutes from "./route/studentsRoute";
import initTeachersRoutes from "./route/teachersRoute";
import initVideosRoutes from "./route/videoRoute";
import initCommentsRoutes from "./route/commentRoute";
import connectDB from "./config/conectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import passport from "passport";
import jwt from "jsonwebtoken";
import paypal from "paypal-rest-sdk";
import cloudinary from "cloudinary";
import swaggerSpec from "./config/swaggerConfig";
import swaggerUi from "swagger-ui-express";
import specs from "./docs/swagger";
import cacheMiddleware from "./middleware/cacheMiddleware";
let app = express();
app.use(cookieParser());
app.use(cors({ origin: true }));
// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dyfbye716",
  api_key: "661796382489326",
  api_secret: "J-lQnSxVlwfEMjyGTXSJ0dyVnQA",
});

//congif paypal
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: "sb-40nko28821456@business.example.com",
  client_secret: "1f*c13I%",
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

//config swagger
// Import the Swagger configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiting configuration
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 50, // Limit each IP to 10 requests per windowMs
// });

// // Apply rate limiting to all requests
// app.use(limiter);

//REDIS LABS
// Sử dụng middleware caching
// app.use(cacheMiddleware);

//Route
viewEngine(app);
initUsersRoutes(app);
initCoursesRoutes(app);
initOrdersRoutes(app);
initPaymentsRoutes(app);
initStudentsRoutes(app);
initTeachersRoutes(app);
initVideosRoutes(app);
initCommentsRoutes(app);
connectDB();

let port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//   return res.status(404).send({
//     errCode: 404,
//     message: "API not found",
//   });
// });
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
