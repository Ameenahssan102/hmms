var express = require('express');
var router = express.Router();
const controller = require('../servicereq.controller');

// POST: [ ADD WORKING STATUS ] -->
router.post('/service/add_working_status', controller.addWorkStatus);

// GET: [ FETCH ALL WORKING STATUS ] -->
router.get('/service/list_of_working_status', controller.getWorkStatus);

// GET: [ DELETE A WORKING STATUS ] -->
router.get('/service/delete_working_status/:id', controller.deleteWorkStatus);

module.exports= router;