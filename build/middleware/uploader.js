"use strict";

var _cloudinary = require("cloudinary");
var _multer = _interopRequireDefault(require("multer"));
var _multerStorageCloudinary = require("multer-storage-cloudinary");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_cloudinary.v2.config({
  cloud_name: "dyfbye716",
  api_key: "661796382489326",
  api_secret: "J-lQnSxVlwfEMjyGTXSJ0dyVnQA"
});
//cloudinary
var storage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: _cloudinary.v2,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "image_nodejs",
    public_id: function public_id(req, file) {
      return file.filename;
    }
  }
});
var uploadCloud = (0, _multer["default"])({
  storage: storage
});
module.exports = {
  uploadCloud: uploadCloud
};