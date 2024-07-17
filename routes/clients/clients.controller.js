const db = require('../../config/connection');
const clients = db.clients;
const status = db.status;
const category = db.category;
const city = db.city;
const careof = db.careof;
const type = db.clienttype
const product = db.equipments;
const sales = db.sales;
const pg = require('../../utils/pagination');
const { Op } = require("sequelize");

const addClients = async (req, res) => {
    try {
        const result = await clients.create({
            careofId:req.body.careofId,
            clientTypeId:req.body.clientTypeId,
            cityId:req.body.cityId,
            name: req.body.name,
            arabicname:req.body.arabicname,
            address1: req.body.address1,
            address2: req.body.address2,
            landmark: req.body.landmark,
            zip: req.body.zip,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            contact3: req.body.contact3,
            email: req.body.email,
        })
        res.send({
            response: "success"
            , message: "client added successfully.."
        });
    } catch (error) {
        console.log(error)
        res.send({
            response: "failed"
            , message: error.message
        });
    }
}


const getAllClientswithid = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    const clientid = req.params.id;
    // const city = req.params.city;
    await clients.findAndCountAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include:[
            {
                model: city,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: careof,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: type,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model: product,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            },
            {
                model:sales,
                attributes: {},
                include:[
                    {
                        model: product,
                        attributes: ['equipmentName']
                    },
                ]
            }
           
        ]
        , where:{
            id:req.params.id
        }, limit, offset
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
        })
}

const getAllClients = async (req, res) => {
    const { page, size, name ,cty ,typ ,eq,creof,id} = req.query;
    var filterbyname = name  ? { name: { [Op.like]: `%${name}%` } } : null;
    var filterbyarabicname = name ? { arabicname: { [Op.like]: `%${name}%` } } : null;
    var filterbycity =  cty ? { id: { [Op.eq]: cty } } : null;
    var filterbytype =  typ ? { id: { [Op.eq]: typ } } : null;
    var filterbyequipment =  eq ? { equipmentName: { [Op.like]: `%${eq}%` } } : null;
    var filterbycareof = creof ? { id: { [Op.eq]: creof } } : null;
    var filterbyid =  name ? { id: { [Op.eq]: name } } : null;
    var condition1 = name ? { [Op.or]: [
        filterbyname,filterbyarabicname,filterbyid
    ]} :null;
    const { limit, offset } = pg.getPagination(page, size);
    await clients.findAndCountAll({
        where:condition1,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include:[
            {
                model: city,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },where:filterbycity
            },
            {
                model: careof,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },where:filterbycareof
            },
            {
                model: type,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },where:filterbytype
            }
        ],
        limit, offset
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
        })
}

const updateClients = async (req, res) => {
    try {
        const result = await clients.update(
            {
                careofId:req.body.careofId,
                clientTypeId:req.body.clientTypeId,
                cityId:req.body.cityId,
                name: req.body.name,
                arabicname:req.body.arabicname,
                address1: req.body.address1,
                address2: req.body.address2,
                landmark: req.body.landmark,
                zip: req.body.zip,
                contact1: req.body.contact1,
                contact2: req.body.contact2,
                contact3: req.body.contact3,
                email: req.body.email,
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "client updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
    console.log(req.body)
}

const updateStatus = async (req, res) => {
    try {
        const result = await clients.update(
            {
                statusCategoryId: req.body.statusCategoryId,
            },
            {
                where: { id: req.body.id }
            }
        )
        res.send({
            response: "success"
            , message: "client status updated successfully.."
        });
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        });
    }
    console.log(req.body)
}

const deleteClient = async (req, res) => {
    try {
        const result = await clients.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result == 0) {
            res.send({
                response: "failed"
                , message: "client does not exist.."
            })
        }
        console.log(result);
        res.send({
            response: "success"
            , message: "client deleted successfully.."
        })
    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}



module.exports = {
    addClients,
    getAllClients,
    updateClients,
    deleteClient,
    updateStatus,
    getAllClientswithid
};