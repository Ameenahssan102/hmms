const db = require('../../../config/connection');
const city = db.city;
const pg = require('../../../utils/pagination');
const Op = db.Sequelize.Op;


const addcity = async (req, res) => {
    try {
        const result = await city.create({
            city:req.body.name,
        })
        res.send({
            response:"success"
            ,message:"city added successfully.."
        });
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        });
    }}


const getAllcitys = async (req, res) => {
    const { page, size} = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await city.findAndCountAll({ where: null, limit, offset })
    .then(data => {
      const response = pg.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch( err => {
        res.send({
             response:err.error
            ,message:err.message
        })
    })
}

const updatecity = async (req, res) => {
    try {
        const result = await city.update(
            {
                city:req.body.name,
        },
        {
            where: { id: req.body.id }
        }
        )
        res.send({
            response:"success"
            ,message:"city updated successfully.."
        });
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        });
    }
    console.log(req.body)
}

const deletecity = async (req, res) => {
    try {
        const result = await city.destroy({
            where:{
                id:req.params.id
            }
        })
        if(result == 0){
            res.send({
                response:"failed"
                ,message:"city does not exist.."
            })
        }
        // console.log(result);
            res.send({
                response:"success"
                ,message:"city deleted successfully.."
            })
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        })
    }
}

module.exports = {
    addcity,
    getAllcitys,
    updatecity,
    deletecity
};