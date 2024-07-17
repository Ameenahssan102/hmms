var express = require('express');
var router = express.Router();
const validate = require('../../utils/validator'); 
const controller = require('../user/user.controller');
const controller2 = require('../DashBoard/dashboard.controller');

const isAdmin = require('../../middleware/isadmin');


// POST: [ SIGNUP USER ] -->
router.post('/auth/sign_up',validate('register'),controller.checkDuplicateUsernameOrEmail,controller.checkRolesExisted, controller.SignUp);

// POST: [ SIGNIN USER ] -->
router.post('/auth/sign_in',validate('login'), controller.SignIn);

// GET: [ FETCH ALL USERS ] -->
router.get('/users', isAdmin,controller.getAllUsers);

// POST: [ UPDATE USER DATA ] -->
router.post('/users/update_users', controller.updateUser);

// GET: [ SIGNOUT USER ] -->
router.get('/auth/log_out', controller.logOut);

// GET: [ ADMIN LIST ] -->
router.get('/users/all_users/:id', controller.getUsersList);

// GET: [ SUB-ADMIN LIST ] -->
router.get('/users/subAdmin_list', controller.getSubAdminList);

// GET: [ DELETE USER WITH ID ] -->
router.get('/users/delete_user/:id', controller.deleteUser);

// GET: [ GET USER WITH ID ] -->
router.get('/users/get_user/:id', controller.getUserWithId);

// GET: [ GET DASHBOARD ] -->
router.get('/users/get_dashboard', controller2.getdashboard);




module.exports= router;