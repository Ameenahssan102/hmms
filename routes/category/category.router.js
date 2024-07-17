var express = require('express');
var router = express.Router();
const controller = require('../category/category.controller');
const {uploadCategoryImage} = require("../../middleware/upload");
const isAdmin = require("../../middleware/isadmin");

// POST: [ ADD CATEGORY ] -->
router.post('/category/add_category',isAdmin, uploadCategoryImage.single("categoryImage"), controller.uploadFiles);

// GET: [ FETCH ALL CATEGORIES WITH FILTER ] -->
router.get('/category/list_of_category', controller.getCategory);

// POST: [ UPDATE CATEGORY ] -->
router.post('/category/update_category/:id',isAdmin, uploadCategoryImage.single("categoryImage"), controller.updateFiles);

// GET: [ DELETE A CATEGORY ] -->
router.get('/category/delete_category/:id',isAdmin, controller.deleteCategory);


module.exports = router;
