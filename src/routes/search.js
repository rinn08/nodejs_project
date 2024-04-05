var express = require('express');
const searchController = require('../app/controllers/SearchController');
var route = express.Router();

route.get('/', searchController.index);

module.exports = route;
