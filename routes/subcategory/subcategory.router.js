var express = require('express');
var router = express.Router();
const controller = require('./subcategory.controller');
const { uploadSubCategoryImage} = require("../../middleware/upload");
const isAdmin = require('../../middleware/isadmin');
const isSubAdmin = require('../../middleware/issubAdmin');

// POST: [ ADD SUB-CATEGORY ] -->
router.post('/category/add_subcategory', isAdmin,uploadSubCategoryImage.single("subcategoryImage"), controller.uploadFiles);

// GET: [ FETCH ALL SUB-CATEGORIES WITH FILTER ] -->
router.get('/category/list_of_subcategory', controller.getsubcategory);

// POST: [ UPDATE SUB-CATEGORY ] -->
router.post('/category/update_subcategory/:id',isAdmin, uploadSubCategoryImage.single("subcategoryImage"), controller.updateFiles);

// GET: [ DELETE A SUB-CATEGORY ] -->
router.get('/category/delete_subcategory/:id',isAdmin, controller.deletesubcategory);

// GET: [ FETCH ALL SUB-CATEGORIES WITH CATEGORY ID ] -->
router.get('/category/subcategory_with_category/:name', controller.getSubCategoryWithcategory);


module.exports = router;