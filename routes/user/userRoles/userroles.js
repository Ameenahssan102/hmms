module.exports = (sequelize,DataTypes)=>{
    const user_roles = sequelize.define('user_role',{
        roleId:{
            type:DataTypes.INTEGER,
           
        },
        userId:{
            type:DataTypes.INTEGER, 
        },
    });
    return user_roles
}