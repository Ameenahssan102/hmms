module.exports = (sequelize,DataTypes)=>{
    Clients = sequelize.define("clients",{
       name:DataTypes.STRING,
       arabicname:DataTypes.STRING,
       address1:DataTypes.STRING(50),
       address2:DataTypes.STRING(50),
       landmark:DataTypes.STRING(50),
       zip:DataTypes.STRING(10),
       email:DataTypes.STRING(35),
       contact1:DataTypes.STRING(12),
       contact2:DataTypes.STRING(12),
       contact3:DataTypes.STRING(12),
   },
   {
       indexes: [
           {allowNull:false, fields:['name']},
           {allowNull:false, fields:['arabicname']},
           {allowNull:false, fields:['address1']},
           {allowNull:true, fields:['address2']},
           {allowNull:true,fields:['landmark']},
           {allowNull:false, fields:['zip']},
           {unique:true,allowNull:true, fields:['email']},
           {unique:true,allowNull:false, fields:['contact1']},
           {allowNull:false, fields:['contact2']},
           {allowNull:false, fields:['contact3']},
       ]
   }
   );
   return Clients;
   }