var express = require('express');
var router = express.Router();
const controller = require('../Service/servicereq.controller');
const { uploadServiceImage } = require("../../middleware/upload");


// POST: [ ADD SERVICE REQUEST ] -->
router.post('/service/add_servicereq', controller.addServiceReq);

// GET: [ FETCH SERVICE REQUEST ALL  WITH FILTER ] -->
router.get('/service/list_of_servicereq', controller.getServiceRequestfilter);

// GET: [ FETCH SERVICE REQUESTS ] -->
router.get('/service/servicereq', controller.getServiceRequestOnly);

// POST: [ UPDATE SERVICE REQUEST] -->
router.post('/service/update_servicereq/:id', uploadServiceImage.fields([{
    name: 'document1', maxCount: 1
},{
    name: 'document2', maxCount: 1
},{
    name: 'document3', maxCount: 1
}]), controller.updateServiceReq);

// GET: [ DELETE A SERVICE REQUEST] -->
router.get('/service/delete_servicereq/:id', controller.deleteServiceRequest);


module.exports = router;