var express = require('express');
var router = express.Router();
const controller = require('../Sales/sales.controller');
const { uploadSalesImage } = require("../../middleware/upload");


// POST: [ ADD sales ] -->
router.post('/sales/add_sales', uploadSalesImage.fields([{
    name: 'invoice', maxCount: 1
}, {
    name: 'installationReport', maxCount: 1
}, {
    name: 'warrantyDocument', maxCount: 1,
}, {
    name: 'maintenanceContract', maxCount: 1,
}, {
    name: 'annualMaintenanceContract', maxCount: 1,
}]),controller.addSales);

// GET: [ FETCH sales ALL  WITH FILTER ] -->
router.get('/sales/list_of_sales', controller.getSaleswithfilter);

// GET: [ FETCH sales ] -->
router.get('/sales/all_sales', controller.getSalesOnly);

// POST: [ UPDATE sales] -->
router.post('/sales/update_sales/:id',uploadSalesImage.fields([{
    name: 'invoice', maxCount: 1
}, {
    name: 'installationReport', maxCount: 1
}, {
    name: 'warrantyDocument', maxCount: 1,
}, {
    name: 'maintenanceContract', maxCount: 1,
}, {
    name: 'annualMaintenanceContract', maxCount: 1,
}]), controller.updateSales);

// GET: [ DELETE A sales] -->
router.get('/sales/delete_sales/:id', controller.deleteSales);





module.exports = router;
