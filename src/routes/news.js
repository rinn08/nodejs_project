var express = require('express');
const newsController = require('../app/controllers/NewsController');
var route = express.Router();

route.get('/', newsController.index);

module.exports = route;
