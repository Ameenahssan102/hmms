const fs = require("fs");
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const equipments = db.equipments;
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const category = db.category;
const subcategory = db.subcategory;
const client = db.clients;
const staff = db.staff;
const workingstatus = db.status;
const { Op } = require("sequelize");
const path = require("path");




const addEquipment = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.send({ response: "failed", message: "You must select a file" });
        }
        await equipments.create({
            subCategoryId: req.body.subCategoryId,
            equipmentName: req.body.equipmentName,
            equipmentImage: `${req.protocol}://${req.get('host')}/uploads/assets/images/equipments/${req.file.filename}`,
            model: req.body.model
        })
        res.send({ response: "success", message: "new equipment has been added.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};

const updateEquipment = async (req, res) => {
    try {
        if (req.file) {
            const imageName = await equipments.findOne({
              where: {
                id: req.params.id
              }
            })
            const directoryPath = __basedir + "/uploads/assets/images/equipments/";
            if(imageName.equipmentImage){
            const image = path.basename(imageName.equipmentImage);
          fs.unlink(directoryPath+image, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          }else{
            var file = `${req.protocol}://${req.get('host')}/uploads/assets/images/equipments/${req.file.filename}`;

          }
        }
        console.log(req.file);
        if (req.file != null) {
            var file = `${req.protocol}://${req.get('host')}/uploads/assets/images/equipments/${req.file.filename}`;
        }
        await equipments.update({
            equipmentName: req.body.equipmentName,
            equipmentImage: file,
            model: req.body.model
        }, {
            where: { id: req.params.id }
        }
        )
        res.send({ response: "success", message: "equipment has been updated.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};



const getEquipmentsOnly = async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await equipments.findAndCountAll({
        raw: true,
        where: null, limit, offset,
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

const getEquipmentsbyId = async (req, res) => {
    await equipments.findOne({
        where: {
            id:req.params.id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send({
                response: "failed"
                , message: err.message
            })
        });
};

const getEquipmentsbyCategory = async (req, res) => {
    const { page, size ,name ,sub ,cat} = req.query;
    var filterbyname = name  ? { equipmentName: { [Op.like]: `%${name}%` } } : null;
    var filterbysubcategory =  sub ? { subCategoryName: { [Op.like]: `%${sub}%` } } : null;
    var filterbycategory =  cat ? { categoryName: { [Op.like]: `%${cat}%` } } : null;
    const { limit, offset } = pg.getPagination(page, size);
    await equipments.findAndCountAll({
        raw: false,
        where:filterbyname, limit, offset,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, include: [{
            model: subcategory,
            attributes: ['subcategoryName']
            , where: filterbysubcategory
        ,
            include: [{
                model: category,
                attributes: ["categoryName"],
                where: filterbycategory
            },]
        },]
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

const getEquipmentswithclient = async (req, res) => {
    const { page, size, title } = req.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = pg.getPagination(page, size);
    await equipments.findAndCountAll({
        raw: false,
        where: null, limit, offset,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, include: [

            {
                model: subcategory,
                attributes: ['subcategoryName']
                ,
                include: [{
                    model: category,
                    attributes: ["categoryName"],
                },]
            },
            {
                model: client,
                attributes: ["id","name"],
            },
            // {
            //     model:workingstatus,
            //     attributes:['workingStatus']
            // }
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


const deleteEquipment = async (req, res) => {
    try {
        const image_exist = await equipments.findOne({
            where: { id: req.params.id }
          });
          if(image_exist.equipmentImage){
          const image = path.basename(image_exist.equipmentImage);
          const directoryPath = __basedir + "/uploads/assets/images/equipments/";
          fs.unlink(directoryPath+image, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
        }
        await equipments.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send({
            response: "success"
            , message: "equipment deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}


module.exports = {
    addEquipment,
    getEquipmentswithclient,
    deleteEquipment,
    updateEquipment,
    getEquipmentsOnly,
    getEquipmentsbyCategory,
    getEquipmentsbyId
};