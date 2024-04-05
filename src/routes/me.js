var express = require('express');
const meController = require('../app/controllers/MeController');
var route = express.Router();


route.get('/stored/courses', meController.storedCourses);
module.exports = route;
