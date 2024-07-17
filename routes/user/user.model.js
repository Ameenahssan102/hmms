module.exports = (sequelize,DataTypes)=>{
    user = sequelize.define("user",{
        username: DataTypes.STRING(30),
        password:DataTypes.STRING,   
        email: DataTypes.STRING(40),
        mobile:DataTypes.STRING(12),
        },{
            indexes: [
                {unique:true,allowNull:false, fields:['username']},
                {allowNull:false, fields:['password']},
                {unique:true,allowNull:false, fields:['email']},
                {unique:true,allowNull:false, fields:['mobile']},
              ]
            });
   return user;
   }