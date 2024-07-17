module.exports = (sequelize,DataTypes)=>{
    AssignStatus = sequelize.define("assign_status",{
       assignStatus:DataTypes.STRING(25),
   },
   {
       indexes: [
           {allowNull:false,fields:['assignStatus']},
       ]
   }
   );
   return AssignStatus;
   }