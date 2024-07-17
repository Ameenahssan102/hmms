const fs = require("fs");
const db = require('../../config/connection');
const pg = require('../../utils/pagination');
const category = db.category;
const { promisify } = require('util');
const path = require("path");
const unlinkAsync = promisify(fs.unlink);



const uploadFiles = async (req, res) => {
  try {
    // console.log(req.file);
    if (req.file == undefined) {
      return res.send({ response: "failed", message: "You must select a file" });
    }
    await category.create({
      categoryName: req.body.categoryName,
      categoryImage: `${req.protocol}://${req.get('host')}/uploads/assets/images/category/${req.file.filename}`
    })
    res.send({ response: "success", message: "new category has been uploaded.." });
  } catch (error) {
    console.log(error);
    return res.send({ response: "failed", message:error.message});
  }
};

const updateFiles = async (req, res) => {
  try {
    // console.log(req.file);
    if (req.file) {
      const imageName = await category.findOne({
        where: {
          id: req.params.id
        }
      });
      const directoryPath = __basedir + "/uploads/assets/images/category/";
     if(imageName.categoryImage){
      const image1 = path.basename(imageName.categoryImage);
        fs.unlink(directoryPath+image1, (err) => {
            if (err) {
              console.error(err)
              return
            }
          });
          var file =  `${req.protocol}://${req.get('host')}/uploads/assets/images/category/${req.file.filename}`
        }else{
          var file =  `${req.protocol}://${req.get('host')}/uploads/assets/images/category/${req.file.filename}`

        }
    }
     await category.update({
        categoryName:req.body.categoryName,
        categoryImage: file
      },{
          where: { id: req.params.id }
      }
      )
      res.send({response:"success",message:"category has been updated.."});
  } catch (error) {
    console.log(error);
    return res.send({ response: "failed", message:error.message});
  }
};

const getCategory = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = pg.getPagination(page, size);
  await category.findAndCountAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }, where: null, limit, offset
  })
    .then(data => {
      const response = pg.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.send({
        response: err.error
        , message: err.message
      })
    });
};

const deleteCategory = async (req, res) => {
  try {
    const image_exist = await category.findOne({
      where: { id: req.params.id }
    });
    if(image_exist.categoryImage){
    const image = path.basename(image_exist.categoryImage);
    const directoryPath = __basedir + "/uploads/assets/images/category/";
    fs.unlink(directoryPath+image, (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
  }
    await category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send({
      response: "success"
      , message: "category deleted successfully.."
    })

  } catch (error) {
    res.send({
      response: "failed"
      , message: error.message
    })
  }
}


module.exports = {
  uploadFiles,
  getCategory,
  deleteCategory,
  updateFiles
};