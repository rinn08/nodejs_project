var express = require('express');
const roadmapController = require('../app/controllers/RoadmapController.js');
var route = express.Router();

route.get('/', roadmapController.index);

module.exports = route;
