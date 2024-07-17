var express = require('express');
var router = express.Router();
const controller = require('../equipments/equipments.controller');
const {uploadEquipmentImage} = require("../../middleware/upload");

// POST: [ ADD EQUIPMENT ] -->
router.post('/equipment/add_equipment', uploadEquipmentImage.single("equipmentImage"), controller.addEquipment);

// GET: [ FETCH EQUIPMENT  WITH SUBCATEGORY] -->
router.get('/equipment/equipment_by_subcategory', controller.getEquipmentsbyCategory);

// GET: [ FETCH EQUIPMENTS WITH ALL  WITH FILTER ] -->
router.get('/equipment/list_of_equipment', controller.getEquipmentswithclient);

// GET: [ FETCH EQUIPMENTS WITH ID ] -->
router.get('/equipment/equipment_by_id/:id', controller.getEquipmentsbyId);


// GET: [ FETCH EQUIPMENTS ] -->
router.get('/equipment/all_equipments', controller.getEquipmentsOnly);

// POST: [ UPDATE EQUIPMENT] -->
router.post('/equipment/update_equipment/:id', uploadEquipmentImage.single("equipmentImage"), controller.updateEquipment);

// GET: [ DELETE A EQUIPMENT] -->
router.get('/equipment/delete_equipment/:id', controller.deleteEquipment);


module.exports = router;