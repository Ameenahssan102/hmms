module.exports = (sequelize,DataTypes)=>{
    CallHandle = sequelize.define("call_handle",{
       callHandle:DataTypes.STRING(25),
   },
   {
       indexes: [
           {allowNull:false,unique:true,fields:['callHandle']},
       ]
   }
   );
   return CallHandle;
   }