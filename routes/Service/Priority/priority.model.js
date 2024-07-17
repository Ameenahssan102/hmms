module.exports = (sequelize,DataTypes)=>{
    priority = sequelize.define("priority",{
        priority:DataTypes.STRING(25),
   },
   {
       indexes: [
           {allowNull:false,unique:true,fields:['priority']},
       ]
   }
   );
   return  priority;
   }