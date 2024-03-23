"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _usersRoute = _interopRequireDefault(require("./route/usersRoute"));
var _coursesRoute = _interopRequireDefault(require("./route/coursesRoute"));
var _ordersRoute = _interopRequireDefault(require("./route/ordersRoute"));
var _paymentsRoute = _interopRequireDefault(require("./route/paymentsRoute"));
var _studentsRoute = _interopRequireDefault(require("./route/studentsRoute"));
var _teachersRoute = _interopRequireDefault(require("./route/teachersRoute"));
var _videoRoute = _interopRequireDefault(require("./route/videoRoute"));
var _commentRoute = _interopRequireDefault(require("./route/commentRoute"));
var _conectDB = _interopRequireDefault(require("./config/conectDB"));
var _cors = _interopRequireDefault(require("cors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
var _passport = _interopRequireDefault(require("passport"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _paypalRestSdk = _interopRequireDefault(require("paypal-rest-sdk"));
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _swaggerConfig = _interopRequireDefault(require("./config/swaggerConfig"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swagger = _interopRequireDefault(require("./docs/swagger"));
var _cacheMiddleware = _interopRequireDefault(require("./middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require("dotenv").config(); // giup chayj dc dong process.env

var app = (0, _express["default"])();
app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])({
  origin: true
}));
// Cấu hình Cloudinary
_cloudinary["default"].config({
  cloud_name: "dyfbye716",
  api_key: "661796382489326",
  api_secret: "J-lQnSxVlwfEMjyGTXSJ0dyVnQA"
});

//congif paypal
_paypalRestSdk["default"].configure({
  mode: "sandbox",
  //sandbox or live
  client_id: "sb-40nko28821456@business.example.com",
  client_secret: "1f*c13I%"
});

// Cài đặt Passport và sử dụng session
app.use(require("express-session")({
  secret: "duclinhjwt",
  resave: true,
  saveUninitialized: true
}));

// Khởi tạo Passport
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());

//config app

app.use(_bodyParser["default"].json({
  limit: "50mb"
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "50mb",
  extended: true
}));

//config swagger
// Import the Swagger configuration
app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerConfig["default"]));

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
(0, _viewEngine["default"])(app);
(0, _usersRoute["default"])(app);
(0, _coursesRoute["default"])(app);
(0, _ordersRoute["default"])(app);
(0, _paymentsRoute["default"])(app);
(0, _studentsRoute["default"])(app);
(0, _teachersRoute["default"])(app);
(0, _videoRoute["default"])(app);
(0, _commentRoute["default"])(app);
(0, _conectDB["default"])();
var port = process.env.PORT || 3000;
// app.use((req, res, next) => {
//   return res.status(404).send({
//     errCode: 404,
//     message: "API not found",
//   });
// });
app.listen(port, function () {
  console.log("Backend Nodejs is running on the port: " + port);
});