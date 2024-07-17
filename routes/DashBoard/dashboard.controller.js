const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const service = db.serviceRequest;
const equipment = db.equipments;
const category = db.category;
const subcategory = db.subcategory;
const client = db.clients;
const user = db.user;
const sales = db.sales;
const { Op } = require("sequelize");

const getdashboard = async (req, res) => {
    var servicecount1;
    var equipmentcount1;
    var usercount1;
    var clientcount1;
    var salescount1;
    var subcategorycount1;
    var categorycount1;
    try {
        await service.findAll().then((result1)=> servicecount1 = result1.length);
        await subcategory.findAll().then((result2)=> subcategorycount1 = result2.length);
        await category.findAll().then((result3)=> categorycount1 = result3.length);
        await equipment.findAll().then((result4)=>{
            console.log(result4);
         equipmentcount1 = result4.length;});
        await user.findAll().then((result5)=> usercount1 = result5.length);
        await client.findAll().then((result6)=> clientcount1 = result6.length);
        await sales.findAll().then((result7)=> salescount1 = result7.length);
        res.status(200).send({ servicecount: servicecount1,
        equipmentcount:equipmentcount1,
        categorycount:categorycount1,
        subcategorycount:subcategorycount1,
    usercount:usercount1,
clientcount:clientcount1,
salescount:salescount1});
    } catch (error) {
        res.send({error:error});
    }
    
}

module.exports = { getdashboard }