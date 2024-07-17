const fs = require("fs");
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const sales = db.sales;
const equipment = db.equipments;
const client = db.clients;
const city = db.city;
const { promisify } = require('util');
const { Op } = require("sequelize");
const path = require("path");
const subcategory = db.subcategory;
const category = db.category;
const unlinkAsync = promisify(fs.unlink);
const preventive = db.preventive;
const calibration = db.calibration;





const addSales = async (req, res) => {
    try {
        if (req.files['invoice'] != null) {
            var file = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['invoice'][0].filename}`;
        }
        if (req.files['installationReport'] != null) {
            var file2 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['installationReport'][0].filename}`;
        }
         if (req.files['warrantyDocument'] != null) {
            var file3 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['warrantyDocument'][0].filename}`;
        }
        if (req.files['maintenanceContract'] != null) {
            var file4 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['maintenanceContract'][0].filename}`;
        }
        if (req.files['annualMaintenanceContract'] != null) {
            var file5 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['annualMaintenanceContract'][0].filename}`;
        }
        var today = new Date();
        today.setDate(today.getDate() + parseInt(req.body.callibrationPeriod));
        var callibrationDate = req.body.callibrationPeriod ? today.toISOString().split('T')[0] : null;
        var today2 = new Date();
        today2.setDate(today2.getDate() + parseInt(req.body.maintenancePeriod));
        var maintenanceDate = req.body.maintenancePeriod ? today2.toISOString().split('T')[0] : null;

        await sales.create({
            serialNo:req.body.serialNo,
            equipmentId:req.body.equipmentId,
            clientId:req.body.clientId,
            callibrationPeriod:callibrationDate,
            maintenancePeriod:maintenanceDate,
            caldays:req.body.callibrationPeriod,
            prevdays:req.body.maintenancePeriod,
            invoice:file,
            installationReport:file2,
            warrantyDocument:file3,
            maintenanceContract:file4,
            annualMaintenanceContract:file5,
            orderDate:req.body.orderDate,
            installationDate:req.body.installationDate,
            warrantyDate:req.body.warrantyDate,

        }).then(data=> {
            console.log(data.dataValues.id);
        if(req.body.maintenancePeriod != null||0){
             preventive.create({
                saleId:data.dataValues.id,
                maintenancePeriod:data.dataValues.maintenancePeriod,
                assignStatusId:1
            });
        }
        if(req.body.callibrationPeriod != null){
             calibration.create({
                saleId:data.dataValues.id,
                callibrationPeriod:data.dataValues.callibrationPeriod,
                assignStatusId:1
            });
        }});
        res.send({ response: "success", message: "new Sales has been added.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};

const updateSales = async (req, res) => {
    try {
        const image_exist = await sales.findOne({
            where:{id:req.params.id}
          });
          const directoryPath = __basedir + "/uploads/assets/images/sales/";
          if (req.files['invoice']) {
          if(image_exist.invoice){
          const image1 = path.basename(image_exist.invoice);
          
            fs.unlink(directoryPath+image1, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              });
              console.error("deleted x image")
            var file = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['invoice'][0].filename}`;
       
          }else{
            var file = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['invoice'][0].filename}`;
          }
        }

        if (req.files['installationReport']) {
          if(image_exist.installationReport){
          const image2 = path.basename(image_exist.installationReport);
      
            fs.unlink(directoryPath+image2, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              });
              console.error("deleted x image")
            var file2 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['installationReport'][0].filename}`;
      
          }else{
            var file2 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['installationReport'][0].filename}`;
          }
          }

          if (req.files['warrantyDocument']) {
          if(image_exist.warrantyDocument){
          const image3 = path.basename(image_exist.warrantyDocument);
         
            fs.unlink(directoryPath+image3, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              });
              console.error("deleted x image")
            var file3 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['warrantyDocument'][0].filename}`;
       
          }else{
            var file3 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['warrantyDocument'][0].filename}`;

          } }
          if (req.files['maintenanceContract']) {
          if(image_exist.maintenanceContract){
          const image4 = path.basename(image_exist.maintenanceContract);
         
            fs.unlink(directoryPath+image4, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              });
              console.error("deleted x image")
            var file4 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['maintenanceContract'][0].filename}`;
       
          }else{
            var file4 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['maintenanceContract'][0].filename}`;

          } }
          if (req.files['annualMaintenanceContract']) {
          if(image_exist.annualMaintenanceContract){
          const image5 = path.basename(image_exist.annualMaintenanceContract);
        
            fs.unlink(directoryPath+image5, (err) => {
                if (err) {
                  console.error(err)
                  return
                }
              });
              console.error("deleted x image")
            var file5 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['annualMaintenanceContract'][0].filename}`;
       
          }else{
            var file5 = `${req.protocol}://${req.get('host')}/uploads/assets/images/sales/${req.files['annualMaintenanceContract'][0].filename}`;

          } }
          
        var today = new Date();
        today.setDate(today.getDate() + parseInt(req.body.callibrationPeriod));
        var callibrationDate = req.body.callibrationPeriod ? today.toISOString().split('T')[0] : null;
        var today2 = new Date();
        today2.setDate(today2.getDate() + parseInt(req.body.maintenancePeriod));
        var maintenanceDate = req.body.maintenancePeriod ? today2.toISOString().split('T')[0] : null;


        // var date1 = new Date(utc1);
        // var date2 = new Date();
        // var caldiffer = date1.getTime() - date2.getTime();
        // var caldays = caldiffer / (1000 * 3600 * 24);

        // var date3 = new Date(utc2);
        // var maindiffer = date3.getTime() - date2.getTime();
        // var maindays =  maindiffer/ (1000 * 3600 * 24);

        await sales.update({
          serialNo:req.body.serialNo,
            equipmentId:req.body.equipmentId,
            clientId:req.body.clientId,
            callibrationPeriod:callibrationDate,
            maintenancePeriod:maintenanceDate,
            caldays:req.body.callibrationPeriod,
            prevdays:req.body.maintenancePeriod,
            invoice:file,
            installationReport:file2,
            warrantyDocument:file3,
            maintenanceContract:file4,
            annualMaintenanceContract:file5,
            orderDate:req.body.orderDate,
            installationDate:req.body.installationDate,
            warrantyDate:req.body.warrantyDate
        }, {
            where: { id: req.params.id }
        }
        ).then(data=> {
        if(req.body.maintenancePeriod != null){
             preventive.update({
                maintenancePeriod:maintenanceDate,
            },{
                where: { saleId:req.params.id}
            });
        }
        if(req.body.callibrationPeriod != null){
             calibration.update({
                callibrationPeriod:callibrationDate,
            },{
                where: { saleId:req.params.id}
            });
        }
    });
        res.send({ response: "success", message: "Sales has been updated.." });
    } catch (error) {
        console.log(error);
        return res.send({ response: "failed", message: error.message });
    }
};

const getSalesOnly = async (req, res) => {
    const { page, size} = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await sales.findAndCountAll({
        raw: false,
        where: null,limit, offset,
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, include: [
            {
                model:client,
                attributes:['name'],
              include:[{
                model: city,
               attributes: ["city","id"],
              }]},
              {
                model:equipment,
                attributes:['equipmentName','model','id'],include:[{
                    model: subcategory,
                   attributes: ["subcategoryName","id"],include:[{
                    model:category,
                   attributes: ["categoryName","id"],
                  }]
                  }]}
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

const getSaleswithfilter = async (req, res) => {
  const { page, size ,sid,title,clntname,cid,eid,search,cityid} = req.query;
  var filterbyeqname = title ? { equipmentName: { [Op.like]: `%${title}%` } } : null;
  var filterbyeqname2 = search ? { '$equipment.equipmentName$': { [Op.like]: `%${search}%` } } : null;
  var filterbyeid = eid ? { id: { [Op.eq]: eid } } : null;
  var filterbycity = cityid ? { id: { [Op.eq]: cityid } } : null;
  var condition =  { [Op.and]: [filterbyeqname, filterbyeid] };
  var filterbycid = cid ? { id: { [Op.eq]: cid } } : null;
  var filterbyclname = clntname ? { name: { [Op.like]: `%${clntname}%` } } : null;
  var filterbyclname2 = search ? { '$client.name$': { [Op.like]: `%${search}%` } } : null;
  var filterbyarabicname = search ? { '$client.arabicname$': { [Op.like]: `%${search}%` } } : null;
  var filterbysaleid = search ? { serialNo: { [Op.like]: `%${search}%` } } : null;
  var condition2 = { [Op.and]: [filterbyclname, filterbycid] };
  var filterbyid =  sid ? { id: { [Op.eq]: sid } } : null;
  var condition1 = search ? { [Op.or]: [
      filterbysaleid,filterbyeqname2,filterbyclname2,filterbyarabicname
  ]} :null;
  var condition3 =  { [Op.and]: [filterbyid,condition1]};
  const { limit, offset } = pg.getPagination(page, size);
  await sales.findAndCountAll({
      raw: false,
      where:condition3
,limit, offset,
      attributes: {
          exclude: ['createdAt', 'updatedAt']
      },
      include: [
          {
              model:client,
              attributes:['arabicname','name','id'],
              as: 'client',
              where:condition2,
            include:[{
              model: city,
             attributes: ["city","id"],
             where:filterbycity,
            }
          ]},
              {
                model:equipment,
                attributes:['equipmentName','model','id'],
                as:'equipment',
                where:condition,
                where:{},
                include:[{
                    model: subcategory,
                   attributes: ["subcategoryName","id"],include:[{
                    model:category,
                   attributes: ["categoryName","id"],
                  }]
                  }]}
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

const deleteSales = async (req, res) => {
    try {
        await preventive.destroy({
            where: {
                saleId: req.params.id
            }
        })
        await calibration.destroy({
            where: {
                saleId: req.params.id
            }
        });
        const image_exist = await sales.findOne({
            where:{id:req.params.id}
          });
          const directoryPath = __basedir + "/uploads/assets/images/sales/";
          if(image_exist.invoice){
          const image1 = path.basename(image_exist.invoice);
          fs.unlink(directoryPath+image1, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          }
          if(image_exist.installationReport){
          const image2 = path.basename(image_exist.installationReport);
          fs.unlink(directoryPath+image2, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          }
          if(image_exist.warrantyDocument){
          const image3 = path.basename(image_exist.warrantyDocument);
          fs.unlink(directoryPath+image3, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          }
          if(image_exist.maintenanceContract){
          const image4 = path.basename(image_exist.maintenanceContract);
          fs.unlink(directoryPath+image4, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          }
          if(image_exist.annualMaintenanceContract){
          const image5 = path.basename(image_exist.annualMaintenanceContract);
          fs.unlink(directoryPath+image5, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          } 
        await sales.destroy({
            where: {
                id: req.params.id
            }
            
        })
       
        res.send({
            response: "success"
            , message: "Sales deleted successfully.."
        })

    } catch (error) {
        res.send({
            response: "failed"
            , message: error.message
        })
    }
}


module.exports = {
    addSales,
    getSaleswithfilter,
    deleteSales,
    updateSales,
    getSalesOnly
};