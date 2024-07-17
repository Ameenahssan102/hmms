const config = require('./database');
const { Sequelize, DataTypes } = require('sequelize');



// INITIALIZATION--
const sequelize = new Sequelize(
  config.database, config.username, config.password,
  {
    host: config.host,
    dialect: "mysql", operatorsAliasis: false
  });

// AUTHENTICATION--
sequelize.authenticate()
  .then(() => {
    console.log('--database connected--');
  }).catch(err =>
    console.log(`Error:${err}`));

// CONNECTION-PROVIDER--
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../routes/user/user.model')(sequelize, DataTypes);
db.role = require('../routes/user/roles/role.model')(sequelize, DataTypes);
// db.userroles = require('../routes/user/userRoles/userroles')(sequelize, DataTypes);
// db.staff = require('../routes/staff/staff.model')(sequelize, DataTypes);
db.city = require('../routes/clients/city/city.model')(sequelize, DataTypes);
db.clienttype = require('../routes/clients/type/type.model')(sequelize, DataTypes);
db.clients = require('../routes/clients/clients.model')(sequelize, DataTypes);
db.careof = require('../routes/clients/careof/careof.model')(sequelize, DataTypes);
db.category = require('../routes/category/category.model')(sequelize, DataTypes);
db.subcategory = require('../routes/subcategory/subcategory.model')(sequelize, DataTypes);
db.equipments = require('../routes/equipments/equipments.model')(sequelize, DataTypes);
db.sales = require('../routes/Sales/sales.model')(sequelize, DataTypes);
db.serviceRequest = require('../routes/Service/service.reqmodel')(sequelize, DataTypes);
db.callHandle = require('../routes/Service/CallHandle/callHandle.model')(sequelize, DataTypes);
db.status = require('../routes/Service/Status/workingstatus.model')(sequelize, DataTypes);
db.workingcondition = require('../routes/Service/Working.condition/working.model')(sequelize, DataTypes);
db.priority = require('../routes/Service/Priority/priority.model')(sequelize, DataTypes);
db.preventive = require('../routes/Reminders/premitive/preventive.model') (sequelize, DataTypes);
db.calibration = require('../routes/Reminders/calibrative/calibrative.model') (sequelize, DataTypes);
db.assign =  require('../routes/Reminders/assign/assign.model') (sequelize, DataTypes);
const Role = db.role;

// ASSOCIATIONS--

db.role.belongsToMany(db.user, {
  through: "user_role",
  foreignKey: "roleId",
});
db.user.belongsToMany(db.role, {
  through: "user_role",
  foreignKey: "userId",
});

db.ROLES = ["admin","subAdmin","Technician"];

// <-----category-subcategory Association------> 
db.category.hasMany(db.subcategory, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.subcategory.belongsTo(db.category);

// <-----category-product Association------> 
db.subcategory.hasMany(db.equipments, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.equipments.belongsTo(db.subcategory);

// <-----city -clients Association------->
db.city.hasMany(db.clients, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.clients.belongsTo(db.city);

// <-----clienttype-clients Association------->
db.clienttype.hasMany(db.clients, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.clients.belongsTo(db.clienttype);

// <-----careof-clients Association------->
db.careof.hasMany(db.clients, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.clients.belongsTo(db.careof);


// <-----equipment -clients Association------->


db.equipments.belongsToMany(db.clients, {
  through:{model: db.sales,unique:false},
  foreignKey: "equipmentId",
});
db.clients.belongsToMany(db.equipments, {
  through: {model: db.sales,unique:false},
  foreignKey: "clientId",
});


//  <-----preventiveRemainderstatus-Sales Association------->

db.sales.hasOne(db.preventive, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.preventive.belongsTo(db.sales);

// // <-----calibrationRemainderstatus-Sales Association------->
db.sales.hasOne(db.calibration, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.calibration.belongsTo(db.sales);


db.assign.hasOne(db.preventive, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.preventive.belongsTo(db.assign);

// // <-----calibrationRemainderstatus-Sales Association------->
db.assign.hasOne(db.calibration, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.calibration.belongsTo(db.assign);





// <-----workingstatus-serviceRequest Association------->
db.status.hasOne(db.serviceRequest, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.serviceRequest.belongsTo(db.status);

// <-----workingcondition-serviceRequest Association------->
db.workingcondition.hasOne(db.serviceRequest, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.serviceRequest.belongsTo(db.workingcondition);


// <-----user-serviceRequest Association-------> 
db.user.hasMany(db.serviceRequest, {
  foreignKey: {
    allowNull: true
  },
  onDelete: 'RESTRICT',
})
db.serviceRequest.belongsTo(db.user);

// <-----sales-serviceRequest Association-------> 
db.sales.hasMany(db.serviceRequest, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.serviceRequest.belongsTo(db.sales);



// <-----callHandle-serviceRequest Association------->
db.callHandle.hasOne(db.serviceRequest, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.serviceRequest.belongsTo(db.callHandle);

// <-----priority-serviceRequest Association------->
db.priority.hasOne(db.serviceRequest, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'RESTRICT',
})
db.serviceRequest.belongsTo(db.priority);



// SYNCING--
db.sequelize.sync({ alter: true, force: false })
  .then((result) => {
    // initial();
    // statusinitial();
    // callHandleinitial();
    // clientTypeinitial();
    // priorityinitial();
    // workingConditioninitial();
    // assignStatusinitial();
    console.log("--sync done--");
  }).catch(err => {
    console.log(`error:${err}`);
  });

async function initial() {
  try {
    const roles = await Role.bulkCreate([
      {
        id: 1,
        name: "admin"
      }, {
        id: 2,
        name: "subAdmin"
      },
      {
        id: 3,
        name: "Technician"
      }
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}


async function callHandleinitial() {
  try {
 await db.callHandle.bulkCreate([
      {
        id: 1,
        callHandle: "Internal"
      }, {
        id: 2,
        callHandle: "External"
      },
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}

async function clientTypeinitial() {
  try {
 await db.clienttype.bulkCreate([
      {
        id: 1,
        client_type: "GOV"
      }, {
        id: 2,
        client_type: "NON-GOV"
      },
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}

async function statusinitial() {
  try {
 await db.status.bulkCreate([
      {
        id: 1,
        workingStatus: "Open"
      }, {
        id: 2,
        workingStatus: "Assigned"
      },
      {
        id: 3,
        workingStatus: "Completed"
      },
      {
        id: 4,
        workingStatus: "Verified"
      },
      {
        id: 5,
        workingStatus: "Cancel"
      },
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}

async function priorityinitial() {
  try {
 await db.priority.bulkCreate([
      {
        id: 1,
        priority: "Low"
      }, {
        id: 2,
        priority: "Medium"
      },
      {
        id: 3,
        priority: "High"
      },
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}



async function assignStatusinitial() {
  try {
 await db.assign.bulkCreate([
      {
        id: 1,
        assignStatus: "Not-Assigned"
      }, {
        id: 2,
        assignStatus: "Assigned"
      },
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}

async function workingConditioninitial() {
  try {
 await db.workingcondition.bulkCreate([
      {
        id: 1,
        workingCondition: "Working"
      }, {
        id: 2,
        workingCondition: "Not-Working"
      },
    ]
    )
  } catch (error) {
    console.log(error.message);
  }
}






module.exports = db;