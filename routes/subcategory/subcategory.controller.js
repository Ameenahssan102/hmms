const fs = require("fs");
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const subcategory = db.subcategory;
const category = db.category
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const { Op } = require("sequelize");
const path = require("path");


const uploadFiles = async (req, res) => {
  try {
    // console.log(req.file);
    
    if (req.file == undefined) {
      return res.send({response:"failed",message:"You must select a file"});
    }
   await subcategory.create({
      subcategoryName: req.body.subcategoryName,
      subcategoryImage:`${req.protocol}://${req.get('host')}/uploads/assets/images/sub_category/${req.file.filename}`,
      categoryId: req.body.categoryId

    })
    res.send({response:"success",message:"new subcategory has been uploaded.."});
  } catch (error) {
    console.log(error);
    return res.send({response:"failed",message:`Error when trying upload images: ${error.message}`});
  }
};



const updateFiles = async (req, res) => {
  try {
    if (req.file) {
      const imageName = await subcategory.findOne({
        where: {
          id: req.params.id
        }
      });
      const directoryPath = __basedir + "/uploads/assets/images/sub_category/";
     if(imageName.subcategoryImage){
      const image1 = path.basename(imageName.subcategoryImage);
        fs.unlink(directoryPath+image1, (err) => {
            if (err) {
              console.error(err)
              return
            }
            console.error("deleted x image")
          });
          var file =  `${req.protocol}://${req.get('host')}/uploads/assets/images/sub_category/${req.file.filename}`
        }
        else{
          var file =  `${req.protocol}://${req.get('host')}/uploads/assets/images/sub_category/${req.file.filename}`

        }
    }
   await subcategory.update({
      subcategoryName:req.body.subcategoryName,
      subcategoryImage: file
    },{
        where: { id: req.params.id }
    }
    )
    res.send({response:"success",message:"subcategory has been updated.."});
  } catch (error) {
    console.log(error);
    return res.send({response:"failed",message:`Error when trying upload images: ${error.message}`});
  }
};

const getsubcategory = async (req, res) => {
  const { page, size ,name ,cat} = req.query;
  var filterbyname = name  ? { subcategoryName: { [Op.like]: `%${name}%` } } : null;
  var filterbycat = cat  ? { categoryId: { [Op.eq]: cat } } : null;
    const { limit, offset } = pg.getPagination(page, size);
    await subcategory.findAndCountAll({attributes: {
      exclude: ['createdAt','updatedAt']
  }, where: {[Op.and]:[filterbyname,filterbycat] }, limit, offset })
    .then(data => {
      const response = pg.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch( err => {
        res.send({
             response:err.error
            ,message:err.message
        })
    });
};


const deletesubcategory = async (req, res) => {
  try {
    const image_exist = await subcategory.findOne({
      where:{id:req.params.id}
    });
    if(image_exist.subcategoryImage){
    const image = path.basename(image_exist.subcategoryImage);
    const directoryPath = __basedir + "/uploads/assets/images/sub_category/";
    fs.unlink(directoryPath+image, (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
  }
    await subcategory.destroy({
         where:{
         id:req.params.id
         } 
        })
          res.send({
              response:"success"
              ,message:"subcategory deleted successfully.."
          })

  } catch (error) {
      res.send({
          response:"failed"
          ,message:error.message
      })
  }
}

const getSubCategoryWithcategory = async(req, res)=>{
  try {
    await category.findAll({
      where:{
        categoryName : req.params.name
      },
      include:[
        {
          model: subcategory
        }
      ]
    }).then((result)=>{
      res.send({
        response:"success",
        data: result
      })
    })
  } catch (error) {
    res.send({
      response:"failed"
      ,message:error.message
  })
  }
}


module.exports = {
  uploadFiles,
  getsubcategory,
  deletesubcategory,
  updateFiles,
  getSubCategoryWithcategory
};