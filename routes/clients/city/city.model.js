module.exports = (sequelize,DataTypes)=>{
    city = sequelize.define("city",{
        city: DataTypes.STRING(50),
        },{
            indexes: [
                {allowNull:false, fields:['city']},]
        });
   return city;
   }