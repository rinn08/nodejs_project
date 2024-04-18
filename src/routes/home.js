var express = require('express');
const HomeController = require('../app/controllers/HomeController');
var route = express.Router();

route.get('/', HomeController.index);

module.exports = route;
