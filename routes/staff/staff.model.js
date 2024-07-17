module.exports = (sequelize,DataTypes)=>{
 Staff = sequelize.define("staff",{
    name:DataTypes.STRING(25),
    email:DataTypes.STRING(35),
    role:DataTypes.STRING(20),
},
{
    indexes: [
        {allowNull:false, fields:['name']},
        {allowNull:false, fields:['email']},
        {allowNull:false, fields:['role']},
    ]
}
);
return Staff;
}

