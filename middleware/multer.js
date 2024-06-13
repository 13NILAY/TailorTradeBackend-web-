const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

const cloudinaryConfig = {
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
};

console.log('Cloudinary Config:', cloudinaryConfig); // Debugging: Print Cloudinary config

cloudinary.config(cloudinaryConfig);

console.log(process.env.api_secret);
// console.log('Cloudinary Config:', cloudinary.config); //

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'jpg', // Ensure format is valid
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return file.fieldname + '-' + uniqueSuffix;
    },
  },
});

const upload = multer({ storage: storage });

module.exports = upload;