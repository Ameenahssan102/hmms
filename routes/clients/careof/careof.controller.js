const db = require('../../../config/connection');
const careof = db.careof;
const pg = require('../../../utils/pagination');
const Op = db.Sequelize.Op;


const addcareof = async (req, res) => {
    try {
        const result = await careof.create({
            careof:req.body.careof,
        })
        res.send({
            response:"success"
            ,message:"careof added successfully.."
        });
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        });
    }}


const getAllcareof = async (req, res) => {
    const { page, size} = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await careof.findAndCountAll({ where: null, limit, offset })
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

const updatecareof = async (req, res) => {
    try {
        const result = await careof.update(
            {
                careof:req.body.careof,
        },
        {
            where: { id: req.body.id }
        }
        )
        res.send({
            response:"success"
            ,message:"careof updated successfully.."
        });
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        });
    }
    console.log(req.body)
}

const deletecareof = async (req, res) => {
    try {
        const result = await careof.destroy({
            where:{
            id:req.params.id
            }
        })
        if(result == 0){
            res.send({
                response:"failed"
                ,message:"careof does not exist.."
            })
        }
        // console.log(result);
            res.send({
                response:"success"
                ,message:"careof deleted successfully.."
            })
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        })
    }
}

module.exports = {
    addcareof,
    getAllcareof,
    updatecareof,
    deletecareof
};