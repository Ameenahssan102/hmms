module.exports = (sequelize,DataTypes)=>{
    Preventive = sequelize.define("preventive_reminder",{
          maintenancePeriod:DataTypes.DATE,
    },{
        indexes: [
            {allowNull:true, fields:['maintenancePeriod']},
        ]
    });
   return Preventive;
   }