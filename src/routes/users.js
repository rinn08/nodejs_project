var express = require('express');
const UserController = require('../app/controllers/UserController');
var route = express.Router();

route.get('/create',UserController.create)
route.get('/login', UserController.login);
route.post('/store', UserController.store);
route.post('/getin',UserController.getin);
route.get('/logout', UserController.logout);
route.get('/forHeader', UserController.forHeader);


module.exports = route;


