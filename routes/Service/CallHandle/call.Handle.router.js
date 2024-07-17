var express = require('express');
var router = express.Router();
const controller = require('../servicereq.controller');

// POST: [ ADD CALL HANDLE ] -->
router.post('/service/add_callhandle', controller.addcallHandle);

// GET: [ FETCH ALL CALL HANDLE ] -->
router.get('/service/list_of_callhandle', controller.getcallHandle);

// GET: [ DELETE A CALL HANDLE ] -->
router.get('/service/delete_callhandle/:id', controller.deletecallHandle);

module.exports= router;