var express = require('express');
var router = express.Router();
const controller = require('../careof/careof.controller');

// POST: [ ADD careof ] -->
router.post('/clients/add_careof', controller.addcareof);

// GET: [ FETCH ALL careofS WITH FILTER ] -->
router.get('/clients/list_of_careofs', controller.getAllcareof);

// POST: [ UPDATE careof ] -->
router.post('/clients/update_careof', controller.updatecareof);

// GET: [ DELETE A careof ] -->
router.get('/clients/delete_careof/:id', controller.deletecareof);


module.exports= router;