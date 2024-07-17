module.exports = (sequelize,DataTypes)=>{
    Category = sequelize.define("category",{
       categoryName:DataTypes.STRING(25),
       categoryImage:DataTypes.STRING
   },
   {
       indexes: [
           {unique:true, allowNull:false, fields:['categoryName']},
           {allowNull:false, fields:['categoryImage']},
       ]
   }
   );
   return Category;
   }