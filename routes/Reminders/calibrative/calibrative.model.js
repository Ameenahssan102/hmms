module.exports = (sequelize,DataTypes)=>{
    Calibrative = sequelize.define("calibrative_reminder",{
          callibrationPeriod:DataTypes.DATE,
    },{
        indexes: [
            {allowNull:true, fields:['callibrationPeriod']},
        ]
    });
   return Calibrative;
   }