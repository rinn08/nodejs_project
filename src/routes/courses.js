var express = require('express');
const coursesController = require('../app/controllers/CourseController');
var route = express.Router();


route.get('/create', coursesController.create);
route.post('/store', coursesController.store);
route.get('/:id/edit', coursesController.edit);
route.put('/:id', coursesController.update);
route.delete('/:id', coursesController.delete);
route.get('/:slug', coursesController.show);

module.exports = route;
