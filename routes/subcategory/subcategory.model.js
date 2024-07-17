module.exports = (sequelize,DataTypes)=>{
    subCategory = sequelize.define("sub_category",{
       subcategoryName:DataTypes.STRING(25),
       subcategoryImage:DataTypes.STRING
   },
   {
       indexes: [
           {unique:true, allowNull:false, fields:['subcategoryName']},
           {allowNull:false, fields:['subcategoryImage']},
       ]
   }
   );
   return  subCategory;
   }