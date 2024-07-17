var express = require('express');
var router = express.Router();
const controller = require('../city/city.controller');

// POST: [ ADD city ] -->
router.post('/citys/add_city', controller.addcity);

// GET: [ FETCH ALL cityS WITH FILTER ] -->
router.get('/citys/list_of_citys', controller.getAllcitys);

// POST: [ UPDATE city ] -->
router.post('/citys/update_city', controller.updatecity);

// GET: [ DELETE A city ] -->
router.get('/citys/delete_city/:id', controller.deletecity);


module.exports= router;