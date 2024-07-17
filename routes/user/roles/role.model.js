module.exports = (sequelize,DataTypes)=>{
    Role = sequelize.define("roles", {
        id: {type: DataTypes.INTEGER,primaryKey: true},
        name:DataTypes.STRING,   
        },{
            indexes: [
                {allowNull:false,fields:['id']},
                {allowNull:false, fields:['name']},
              ]
            });
   return Role;
   }