import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dyfbye716",
  api_key: "661796382489326",
  api_secret: "J-lQnSxVlwfEMjyGTXSJ0dyVnQA",
});
//cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "image_nodejs",
    public_id: (req, file) => file.filename,
  },
});
const uploadCloud = multer({ storage: storage });

module.exports = {
  uploadCloud,
};
