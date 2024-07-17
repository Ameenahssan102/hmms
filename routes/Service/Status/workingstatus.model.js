module.exports = (sequelize,DataTypes)=>{
    WorkingStatus = sequelize.define("status",{
       workingStatus:DataTypes.STRING(25),
   },
   {
       indexes: [
           {allowNull:false,unique:true,fields:['workingStatus']},
       ]
   }
   );
   return WorkingStatus;
   }