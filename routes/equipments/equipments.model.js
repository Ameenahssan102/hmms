module.exports = (sequelize,DataTypes)=>{
    Equipments = sequelize.define("equipments",{
       equipmentName:DataTypes.STRING(25),
       equipmentImage:DataTypes.STRING,
       model:DataTypes.STRING(25),
    //    callibrationPeriod: DataTypes.STRING(25),
    //    maintenancePeriod:DataTypes.STRING(25),
    //    invoice:DataTypes.STRING,
    //    installationReport:DataTypes.STRING,
    //    warrantyDocument:DataTypes.STRING,
    //    maintenanceContract:DataTypes.STRING,
    //    annualMaintenanceContract:DataTypes.STRING,
    //    purchaseDate:DataTypes.DATE,
    //    orderDate:DataTypes.DATE,
    //    installationDate:DataTypes.DATE,
    //    warrantyDate:DataTypes.DATE
   },
   {
       indexes: [
           {allowNull:false, fields:['equipmentName']},
           {allowNull:false, fields:['equipmentImage']},
           {allowNull:true, fields:['model']},
        //    {allowNull:true, fields:['callibrationPeriod']},
        //    {allowNull:true, fields:['maintenancePeriod']},
        //    {allowNull:true, fields:['invoice']},
        //    {allowNull:true, fields:['installationReport']}, 
        //    {allowNull:true, fields:['warrantyDocument']},
        //    {allowNull:true, fields:['maintenanceContract']},
        //    {allowNull:true, fields:['annualMaintenanceContract']},
        //    {allowNull:false, fields:['purchaseDate']},
        //    {allowNull:false, fields:['orderDate']},
        //    {allowNull:false, fields:['installationDate']},
        //    {allowNull:false, fields:['warrantyDate']},
       ]
   }
   );
   return Equipments;
   }