var express = require('express');
var router = express.Router();
const controller = require('../type/type.controller');

// POST: [ ADD clienttype ] -->
router.post('/clients/add_clienttype', controller.addclienttype);

// GET: [ FETCH ALL clienttypeS WITH FILTER ] -->
router.get('/clients/list_of_clienttypes', controller.getAllclienttypes);

// POST: [ UPDATE clienttype ] -->
router.post('/clients/update_clienttype', controller.updateclienttype);

// GET: [ DELETE A clienttype ] -->
router.get('/clients/delete_clienttype/:id', controller.deleteclienttype);


module.exports= router;