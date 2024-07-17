const db = require('../../../config/connection');
const clienttype = db.clienttype;
const pg = require('../../../utils/pagination');
const Op = db.Sequelize.Op;


const addclienttype = async (req, res) => {
    try {
        const result = await clienttype.create({
            client_type:req.body.client_type,
        })
        res.send({
            response:"success"
            ,message:"clienttype added successfully.."
        });
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        });
    }}


const getAllclienttypes = async (req, res) => {
    const { page, size} = req.query;
    const { limit, offset } = pg.getPagination(page, size);
    await clienttype.findAndCountAll({ where: null, limit, offset })
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

const updateclienttype = async (req, res) => {
    try {
        const result = await clienttype.update(
            {
                clienttype:req.body.clienttype,
        },
        {
            where: { id: req.body.id }
        }
        )
        res.send({
            response:"success"
            ,message:"clienttype updated successfully.."
        });
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        });
    }
    console.log(req.body)
}

const deleteclienttype = async (req, res) => {
    try {
        const result = await clienttype.destroy({
            where:{
            id:req.params.id
            }
        })
        if(result == 0){
            res.send({
                response:"failed"
                ,message:"clienttype does not exist.."
            })
        }
        console.log(result);
            res.send({
                response:"success"
                ,message:"clienttype deleted successfully.."
            })
    } catch (error) {
        res.send({
            response:"failed"
            ,message:error.message
        })
    }
}

module.exports = {
    addclienttype,
    getAllclienttypes,
    updateclienttype,
    deleteclienttype
};