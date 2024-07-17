module.exports = (sequelize,DataTypes)=>{
    WorkingCondition = sequelize.define("working_condition",{
       workingCondition:DataTypes.STRING(25),
   },
   {
       indexes: [
           {allowNull:false,unique:true,fields:['workingCondition']},
       ]
   }
   );
   return WorkingCondition;
   }