
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const service = db.serviceRequest;
const equipment = db.equipments;
const call_handle = db.callHandle;
const working_status = db.status;
const client = db.clients;
const user = db.user;
const Role = db.role;
const ROLES = db.ROLES;
const sales = db.sales;
const priority = db.priority;
const WorkingCondition = db.workingcondition;
const preventive = db.preventive;
const calibration = db.calibration;
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");





const addServiceReq = async (req, res) => {
    user.findByPk(req.body.staffId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Technician") {
                    return;
                }
            }
            res.status(403).send({
                message: "Technicians only!"
            });
            return;
        });
    });

    try {
        await service.create({
            saleId: req.body.saleId,
            description: req.body.description,
            userId: req.body.staffId,
            callHandleId: req.body.callHandleId,
            statusId: req.body.statusId,
            type: req.body.type,
            workingConditionId: req.body.workingConditionId,
            priorityId: req.body.priorityId,
            callRegisterDate: req.body.callRegisterDate,
            attendedOn: req.body.attendedOn,
            completedOn: req.body.completedOn
        });
        res.send({ response: "success", message: "new Service Request has been added.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};

const updateServiceReq = async (req, res) => {
    var file; var file2; var file3;
    if (req.body.statusId == 3 || 5) {
        await sales.findOne({
            where: {
                id: req.body.saleId
            }
        }).then(datas => {
            console.log(datas.dataValues.caldays);
            var caldate = datas.dataValues.caldays;
            var predate = datas.dataValues.prevdays;
            var today = new Date();
            today.setDate(today.getDate() + parseInt(caldate));
            var callibrationDate = caldate ? today.toISOString().split('T')[0] : null;
            var today2 = new Date();
            today2.setDate(today2.getDate() + parseInt(predate));
            var maintenanceDate = predate ? today2.toISOString().split('T')[0] : null;
            preventive.findAll({
                where: {
                    [Op.and]: [{
                        saleId: req.body.saleId
                    }, {
                        assignStatusId: 2
                    }]
                }
            }).then(data => {
                if (data) {
                    sales.update({
                        maintenancePeriod: maintenanceDate,
                    }, { where: { id: req.body.saleId } }).then(data => {
                        preventive.update({
                            assignStatusId: 1,
                            maintenancePeriod: maintenanceDate,
                        }, {
                            where: { saleId: req.body.saleId }
                        });
                        console.log("preventive updated");
                    });
                }
            });
            calibration.findAll({
                where: {
                    [Op.and]: [{
                        saleId: req.body.saleId
                    }, {
                        assignStatusId: 2
                    }]
                }
            }).then(data => {
                if (data) {
                    sales.update({
                        callibrationPeriod: callibrationDate,
                    }, { where: { id: req.body.saleId } }).then(data => {
                        calibration.update({
                            assignStatusId: 1,
                            callibrationPeriod: callibrationDate,
                        }, {
                            where: { saleId: req.body.saleId }
                        });
                        console.log("callibration updated");

                    });
                }
            });
        }
        );
    }

    const image_exist = await service.findOne({
        where: { id: req.params.id }
    });

    const directoryPath = __basedir + "/uploads/assets/images/service/";

    if (image_exist.document1) {
        const image1 = path.basename(image_exist.document1);
        if (req.files['document1'] != null) {
            fs.unlink(directoryPath + image1, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            file = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document1'][0].filename}`;
        }
    } else {
        if (req.files['document1'] != null) {
            file = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document1'][0].filename}`;
        }
    }
    if (image_exist.document2) {
        const image2 = path.basename(image_exist.document2);
        if (req.files['document2'] != null) {
            fs.unlink(directoryPath + image2, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            file2 = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document2'][0].filename}`;
        }
    } else {
        if (req.files['document2'] != null) {
            file2 = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document2'][0].filename}`;
        }
    }
    if (image_exist.document3) {
        const image3 = path.basename(image_exist.document3);
        if (req.files['document3'] != null) {
            fs.unlink(directoryPath + image3, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
            file3 = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document3'][0].filename}`;
        }
    } else {
        if (req.files['document3'] != null) {
            file3 = `${req.protocol}://${req.get('host')}/uploads/assets/images/service/${req.files['document3'][0].filename}`;
        }
    }

    try {
        await service.update({
            saleId: req.body.saleId,
            description: req.body.description,
            document1: file,
            document2: file2,
            document3: file3,
            userId: req.body.staffId,
            callHandleId: req.body.callHandleId,
            statusId: req.body.statusId,
            workingConditionId: req.body.workingConditionId,
            priorityId: req.body.priorityId,
            type: req.body.type,
            callRegisterDate: req.body.callRegisterDate,
            attendedOn: req.body.attendedOn,
            completedOn: req.body.completedOn
        }, {
            where: { id: req.params.id }
        }
        );
        res.send({ response: "success", message: "Service Request has been updated.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};

const getServiceRequestOnly = async (req, res) => {
    const { page, size, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = pg.getPagination(page, size);
    await service.findAndCountAll({
        raw: true,
        where: condition, limit, offset,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
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

const getServiceRequestfilter = async (req, res) => {
    const { page, size, id, tech, sid, statid, priorityId, startdte, enddte, clientid, eqid, search } = req.query;
    var filterbyid = id ? { id: { [Op.eq]: id } } : null;
    var filterbytech = tech ? { id: { [Op.eq]: tech } } : null;
    var filterbystatus = statid ? { id: { [Op.eq]: statid } } : null;
    var filterbypriority = priorityId ? { id: { [Op.eq]: priorityId } } : null;
    var filterbydate = startdte ? { createdAt: { [Op.between]: [startdte, enddte] } } : null;
    var filterbyclient = clientid ? { id: { [Op.eq]: clientid } } : null;
    var filterbyequip = eqid ? { id: { [Op.eq]: eqid } } : null;
    var filterbysales = sid ? { id: { [Op.eq]: sid } } : null;
    var filterbyeqname2 = search ? { '$sale.equipment.equipmentName$': { [Op.like]: `%${search}%` } } : null;
    var filterbyclname2 = search ? { '$sale.client.name$': { [Op.like]: `%${search}%` } } : null;
    var filterbyarabicname = search ? { '$sale.client.arabicname$': { [Op.like]: `%${search}%` } } : null;
    var condition1 = search ? {
        [Op.or]: [
            filterbyclname2, filterbyeqname2, filterbyarabicname
        ]
    } : null;
    var condition3 = { [Op.and]: [condition1, filterbyid, filterbydate] };
    const { limit, offset } = pg.getPagination(page, size);
    await service.findAndCountAll({
        raw: false,
        where: condition3, limit, offset,
        attributes: {},
        order: [['statusId', 'ASC']],
        include: [
            {
                model: sales,
                where: filterbysales,

                include: [
                    {
                        model: client,
                        attributes: ['arabicname', 'name', 'id'],
                        as: 'client',
                        where: filterbyclient,
                        include: [{
                            model: city,
                            attributes: ["city", "id"],

                        }
                        ]
                    },
                    {
                        model: equipment,
                        attributes: ['equipmentName', 'model', 'id'],
                        as: 'equipment',
                        where: filterbyequip,
                        where: {},
                    }

                ]
            },
            {
                model: user,
                attributes: ["username", 'id'],
                where: filterbytech,
            },
            {
                model: call_handle,
                attributes: ['callHandle']
            },
            {
                model: working_status,
                attributes: ['workingStatus', 'id'],
                where: filterbystatus

            },
            {
                model: priority,
                attributes: ['priority', 'id'],
                where: filterbypriority
            },
            {
                model: WorkingCondition,
                attributes: ['workingCondition']
            },
        ]
    })
        .then(data => {
            const response = pg.getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            console.log(err);
            res.send({
                response: "failed"
                , message: err.message
            })
        });
};



const deleteServiceRequest = async (req, res) => {
    try {
        const image_exist = await service.findOne({
            where: { id: req.params.id }
        });
        const directoryPath = __basedir + "/uploads/assets/images/service/";

        if (image_exist.document1) {
            const image1 = path.basename(image_exist.document1);
            fs.unlink(directoryPath + image1, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
        if (image_exist.document2) {
            const image2 = path.basename(image_exist.document2);
            fs.unlink(directoryPath + image2, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
        if (image_exist.document3) {
            const image3 = path.basename(image_exist.document3);
            fs.unlink(directoryPath + image3, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
        await service.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: "Service Request deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}

const getcallHandle = async (req, res) => {
    try {
        await call_handle.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }).then((result) =>
            res.send({ data: result }));
    } catch (error) {
        res.send({ error });
    }
}

const addcallHandle = async (req, res) => {
    try {
        const result = await call_handle.create({
            callHandle: req.body.callHandle
        });
        res.send({ data: result });
    } catch (error) {
        res.send({ error });
    }
}

const deletecallHandle = async (req, res) => {
    try {
        await call_handle.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: " call_handle deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}

const getWorkStatus = async (req, res) => {
    try {
        await working_status.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            order: [
                ['id', 'ASC'],
            ],
        }).then((result) =>
            res.send({ data: result }));
    } catch (error) {
        res.send({ error });
    }
}

const addWorkStatus = async (req, res) => {
    try {
        const result = await working_status.create({
            workingStatus: req.body.workingStatus
        });
        res.send({ data: result });
    } catch (error) {
        res.send({ error });
    }
}
const deleteWorkStatus = async (req, res) => {
    try {
        await working_status.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: " working_status deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}



const getPriority = async (req, res) => {
    try {
        await priority.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }).then((result) =>
            res.send({ data: result }));
    } catch (error) {
        res.send({ error });
    }
}

const addPriority = async (req, res) => {
    try {
        const result = await priority.create({
            priority: req.body.priority
        });
        res.send({ data: result });
    } catch (error) {
        res.send({ error });
    }
}
const deletePriority = async (req, res) => {
    try {
        await priority.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: " priority deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}

const getWorkingCondition = async (req, res) => {
    try {
        await WorkingCondition.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
        }).then((result) =>
            res.send({ data: result }));
    } catch (error) {
        res.send({ error });
    }
}

const addWorkingCondition = async (req, res) => {
    try {
        const result = await WorkingCondition.create({
            workingCondition: req.body.condition
        });
        res.send({ data: result });
    } catch (error) {
        res.send({ error });
    }
}
const deleteWorkingCondition = async (req, res) => {
    try {
        await WorkingCondition.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: " WorkingCondition deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}


module.exports = {
    addServiceReq,
    getServiceRequestfilter,
    deleteServiceRequest,
    updateServiceReq,
    getServiceRequestOnly,
    addcallHandle,
    getcallHandle,
    addWorkStatus,
    getWorkStatus,
    deleteWorkStatus,
    deletecallHandle,
    getPriority,
    addPriority,
    deletePriority,
    getWorkingCondition,
    addWorkingCondition,
    deleteWorkingCondition,

};