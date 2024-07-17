const fs = require("fs");
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const sales = db.sales;
const equipment = db.equipments;
const client = db.clients;
const city = db.city;
const subcategory = db.subcategory;
const category = db.category;
const preventive = db.preventive;
const calibration = db.calibration;
const service = db.serviceRequest;
const { Op } = require("sequelize");



const getpreventiveReminder = async (req, res) => {
    const { page, size, sort, startdate, enddate } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    var order = sort ? [['maintenancePeriod', sort]] : null;
    var today = startdate ? startdate : new Date();
    var priorDate = enddate ? enddate : new Date(new Date().setDate(today.getDate() + 30));
    await preventive.findAndCountAll({
        raw: false,
        where: {

            [Op.and]: [{
                maintenancePeriod: {[Op.or]:[{ [Op.between]: [ today,priorDate] },
                { [Op.lt]:today },
            ]}
            }, { assignStatusId: 1 }]
        }, limit, offset, order: order,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        }, include: [
            {
                model: sales,
                attributes: {},
                include: [
                    {
                        model: client,
                        attributes: ['name'],
                        include: [{
                            model: city,
                            attributes: ["city", "id"],
                        }]
                    },
                    {
                        model: equipment,
                        attributes: ['equipmentName', 'model', 'id'], include: [{
                            model: subcategory,
                            attributes: ["subcategoryName", "id"], include: [{
                                model: category,
                                attributes: ["categoryName", "id"],
                            }]
                        }]
                    }
                ]
            }
        ]
    })
        .then(data => {
            const response = pg.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.send({
                response: "failed"
                , message: err.message
            })
        });
};

const getcalibrativeReminder = async (req, res) => {
    const { page, size, sort, startdate, enddate } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    var order = sort ? [['callibrationPeriod', sort]] : null;
    var today = startdate ? startdate : new Date();
    var priorDate = enddate ? enddate : new Date(new Date().setDate(today.getDate() + 30));
    await calibration.findAndCountAll({
        raw: false,
        where: {
            [Op.and]: [{
                callibrationPeriod: {[Op.or]:[{ [Op.between]: [ today,priorDate] },
                { [Op.lt]:today },
            ]}
            },
            { assignStatusId: 1 }]
        }, limit, offset, order: order,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        }, include: [
            {
                model: sales,
                attributes: {},
                include: [
                    {
                        model: client,
                        attributes: ['name'],
                        include: [{
                            model: city,
                            attributes: ["city", "id"],
                        }]
                    },
                    {
                        model: equipment,
                        attributes: ['equipmentName', 'model', 'id'], include: [{
                            model: subcategory,
                            attributes: ["subcategoryName", "id"], include: [{
                                model: category,
                                attributes: ["categoryName", "id"],
                            }]
                        }]
                    }
                ]
            }
        ]
    })
        .then(data => {
            const response = pg.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.send({
                response: "failed"
                , message: err.message
            })
        });
};


const addServiceReqfrompreventive = async (req, res) => {
    try {
        await service.create({
            saleId: req.body.saleId,
            description: req.body.description,
            userId: req.body.staffId,
            callHandleId: req.body.callHandleId,
            statusId: req.body.statusId,
            type: "Preventive",
            workingConditionId: req.body.workingConditionId,
            priorityId: req.body.priorityId,
            callRegisterDate: req.body.callRegisterDate,
            attendedOn: req.body.attendedOn,
            completedOn: req.body.completedOn
        }).then(data => {
            preventive.update({
                assignStatusId: 2
            }, {
                where: { saleId: req.body.saleId }
            });
        }
        );
        res.send({ response: "success", message: "new Service Request has been added.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};



const addServiceReqfromcalibrative = async (req, res) => {
    try {
        await service.create({
            saleId: req.body.saleId,
            description: req.body.description,
            userId: req.body.staffId,
            callHandleId: req.body.callHandleId,
            statusId: req.body.statusId,
            type: "Calibrative",
            workingConditionId: req.body.workingConditionId,
            priorityId: req.body.priorityId,
            callRegisterDate: req.body.callRegisterDate,
            attendedOn: req.body.attendedOn,
            completedOn: req.body.completedOn
        }).then(data => {
            calibration.update({
                assignStatusId: 2
            }, {
                where: { saleId: req.body.saleId }
            });
          
        });
        res.send({ response: "success", message: "new Service Request has been added.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};

module.exports = {
    getpreventiveReminder,
    getcalibrativeReminder,
    addServiceReqfrompreventive,
    addServiceReqfromcalibrative
}