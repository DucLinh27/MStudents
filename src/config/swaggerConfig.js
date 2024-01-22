const swaggerJSDoc = require("swagger-jsdoc");

// Thông tin cơ bản về API
const swaggerDefinition = {
  info: {
    title: "Node.js Swagger API",
    version: "1.0.0",
    description: "Example API with Swagger",
  },
  host: "localhost:8080", // Thay đổi thành domain và port của ứng dụng của bạn
  basePath: "/",
};

// Options cho swagger-jsdoc
const options = {
  swaggerDefinition,
  // File chứa các endpoint và các comment
  apis: ["./routes/*.js"], // Điều chỉnh đường dẫn này dựa trên cấu trúc thư mục của bạn
};

// Khởi tạo Swagger JSDoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
