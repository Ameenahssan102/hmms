var express = require('express');
var router = express.Router();
const controller = require('../servicereq.controller');

// POST: [ ADD WORKING STATUS ] -->
router.post('/service/add_priority', controller.addPriority);

// GET: [ FETCH ALL WORKING STATUS ] -->
router.get('/service/list_of_priority', controller.getPriority);

// GET: [ DELETE A WORKING STATUS ] -->
router.get('/service/delete_priority/:id', controller.deletePriority);

module.exports= router;