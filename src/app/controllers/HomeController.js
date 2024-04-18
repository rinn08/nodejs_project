const Course = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');

class HomeController {
    // -GET -> path(/news)
    index(req,res,next){
        Course.find({})
            .then(courses=>{
                res.render('home',{
                    courses: multipleMongooseToObject(courses),
                })
            })
            .catch(next)
    }
    search(req,res){
        res.render('search');
    }
}

module.exports = new HomeController();


// const Course = require("../models/Course");

// class SiteController {
//     // [GET] /news
//     async index(req, res) {
//       try {
//         const courses = await Course.find({});
//         res.json(courses);
//       } catch (error) {
//         res.status(400).json({ err: "ERROR!!!" });
//       }
//     }
//     // [GET] /search
//     search(req, res) {
//       res.render("search");
//     }
//   }
  
//   module.exports = new SiteController();
