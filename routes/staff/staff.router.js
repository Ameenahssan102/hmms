var express = require('express');
var router = express.Router();
const controller = require('../staff/staff.controller');
const isTechnician = require('../../middleware/istechnician');
const { uploadServiceImage } = require("../../middleware/upload");



// GET: [ FETCH ALL TECHNICIANS WITH SERVICE REQUESTS ] -->
router.get('/users/list_of_technicians', controller.gettechnicianList);


// GET: [ FETCH ALL SERVICE REQUESTS WITH TECHNICIAN ] -->
router.get('/users/list_of_service/:id', isTechnician, controller.getServiceRequestsList);

// GET: [ FETCH ALL SERVICE REQUESTS COUNT ] -->
router.get('/service/service_count/:id', controller.getServiceCount);

// GET: [ FETCH DASHBOARD ] -->
router.get('/service/dashboard/:id', controller.getdashboard);

// POST: [ UPDATE SERVICE REQUEST] -->
router.post('/service/update_serviceby_staff/:id', uploadServiceImage.fields([{
    name: 'document1', maxCount: 1
},{
    name: 'document2', maxCount: 1
},{
    name: 'document3', maxCount: 1
}]), controller.updateServiceReq);

module.exports = router;