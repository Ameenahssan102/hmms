module.exports = (sequelize,DataTypes)=>{
    clienttype = sequelize.define("client_type",{
        client_type: DataTypes.STRING(50),
        },{
            indexes: [
                {allowNull:false, fields:['client_type']},]
        });
   return clienttype;
   }