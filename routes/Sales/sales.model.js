module.exports = (sequelize,DataTypes)=>{
    const sales = sequelize.define('sale',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique:true,
          },
          serialNo: {type:DataTypes.STRING(25),unique:'serialNo'},
          equipmentId:DataTypes.INTEGER,
        clientId:DataTypes.INTEGER,
       callibrationPeriod: DataTypes.DATE,
       maintenancePeriod:DataTypes.DATE,
       caldays:DataTypes.INTEGER,
       prevdays:DataTypes.INTEGER,
       invoice:DataTypes.STRING,
       installationReport:DataTypes.STRING,
       warrantyDocument:DataTypes.STRING,
       maintenanceContract:DataTypes.STRING,
       annualMaintenanceContract:DataTypes.STRING,
       purchaseDate:DataTypes.DATE,
       orderDate:DataTypes.DATE,
       installationDate:DataTypes.DATE,
       warrantyDate:DataTypes.DATE
    },{
        indexes: [
            {allowNull:false, fields:['serialNo']},
            {allowNull:false, fields:['equipmentId']},
            {allowNull:false, fields:['clientId']},
           {allowNull:true, fields:['callibrationPeriod']},
           {allowNull:true, fields:['maintenancePeriod']},
           {allowNull:true, fields:['invoice']},
           {allowNull:true, fields:['installationReport']}, 
           {allowNull:true, fields:['warrantyDocument']},
           {allowNull:true, fields:['maintenanceContract']},
           {allowNull:true, fields:['annualMaintenanceContract']},
           {allowNull:false, fields:['orderDate']},
           {allowNull:false, fields:['installationDate']},
           {allowNull:false, fields:['warrantyDate']},
        ]
    });
    return sales
}