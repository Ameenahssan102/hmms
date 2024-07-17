var express = require('express');
var router = express.Router();
const controller = require('../Reminders/reminder.controller');



// GET: [ FETCH PREMITIVE REMINDERS ] -->
router.get('/remainder/preventive_remainder', controller.getpreventiveReminder);

// GET: [ FETCH CALIBRATIVE REMINDERS ] -->
router.get('/remainder/calibration_remainder', controller.getcalibrativeReminder);

// POST: [ ADD SERVICE REQUEST FROM PREVENTIVE REMAINDER] -->
router.post('/service/add_servicereq_frompreventive', controller.addServiceReqfrompreventive);

// POST: [ ADD SERVICE REQUEST FROM CALIBRATIVE REMAINDER] -->
router.post('/service/add_servicereq_fromcalibrative', controller.addServiceReqfromcalibrative);


module.exports = router;