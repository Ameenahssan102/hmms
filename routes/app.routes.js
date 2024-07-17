const staffs = require('./staff/staff.router');
const users = require('./user/user.router');
const clients = require('./clients/clients.router');
const category = require('./category/category.router');
const equipments = require('./equipments/equipments.router');
const service = require('./Service/service.router');
const callhandle = require('./Service/CallHandle/call.Handle.router');
const workingStatus = require('./Service/Status/working_status.router');
const subcategory = require('./subcategory/subcategory.router');
const careof = require('./clients/careof/careof.router');
const city = require('./clients/city/city.router');
const clienttype = require('./clients/type/type.router');
const sales =  require('./Sales/sales.router');
const priority =  require('./Service/Priority/priority.router');
const workingcondition  = require('./Service/Working.condition/working_condition.router');
const remainders = require('./Reminders/reminder.router');



function createRoutes(app) {
    app.use('/api',users,staffs,clients,category,subcategory,careof,city,clienttype,equipments,service,callhandle,workingStatus,sales,priority,workingcondition,remainders );
}

module.exports = {
    createRoutes:createRoutes
}