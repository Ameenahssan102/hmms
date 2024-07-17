module.exports = (sequelize,DataTypes)=>{
    careof = sequelize.define("careof",{
        careof: DataTypes.STRING(50),
        },{
            indexes: [
                {allowNull:false, fields:['careof']},]
        });
   return careof;
   }