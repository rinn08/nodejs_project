var express = require('express');
const UserController = require('../app/controllers/UserController');
var route = express.Router();

route.get('/create',UserController.create)
route.get('/login', UserController.login);
route.post('/store', UserController.store);
route.post('/getin',UserController.getin);
route.get('/logout', UserController.logout);
route.get('/forHeader', UserController.forHeader);
route.post('/checkExistence', UserController.checkExistence);
route.post('/resetPassword', UserController.resetPassword);
route.get('/forgotPassword', UserController.forgotPassword);



module.exports = route;


