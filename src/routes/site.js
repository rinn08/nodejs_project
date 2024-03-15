var express = require('express');
const siteController = require('../app/controllers/SiteController');
var route = express.Router();

route.get('/', siteController.index);

module.exports = route;
