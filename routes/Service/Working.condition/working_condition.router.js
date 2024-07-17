var express = require('express');
var router = express.Router();
const controller = require('../servicereq.controller');

// POST: [ ADD WORKING STATUS ] -->
router.post('/service/add_working_condition', controller.addWorkingCondition);

// GET: [ FETCH ALL WORKING STATUS ] -->
router.get('/service/list_of_working_condition', controller.getWorkingCondition);

// GET: [ DELETE A WORKING STATUS ] -->
router.get('/service/delete_working_condition/:id', controller.deleteWorkingCondition);

module.exports= router;