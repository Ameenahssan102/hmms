const multer = require("multer");
const path = require('path');


const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/assets/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
var categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/assets/images/category");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
var subcategoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/assets/images/sub_category");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
var equipmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/assets/images/equipments");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
var salesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/assets/images/sales");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

var serviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/assets/images/service");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
var uploadCategoryImage = multer({ storage: categoryStorage, fileFilter: imageFilter });
var uploadSubCategoryImage = multer({ storage: subcategoryStorage, fileFilter: imageFilter });
var uploadEquipmentImage = multer({ storage: equipmentStorage, fileFilter: imageFilter });
var uploadSalesImage =  multer({ storage: salesStorage});
var uploadServiceImage = multer({storage:serviceStorage});
module.exports = {
  uploadFile,
  uploadCategoryImage,
  uploadSubCategoryImage,
  uploadEquipmentImage,
  uploadSalesImage,
  uploadServiceImage
}