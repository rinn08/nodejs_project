const newsRouter = require('./news');
const searchRouter = require('./search');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const usersRouter = require('./users');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/search', searchRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/users', usersRouter);
    
    app.use('/', siteRouter);
    app.use((req, res) => {
      res.status(404).render('404');
    });

    // app.get('/detailProduct', (req, res) => {
    // res.render('detailProduct');
    // })

    // app.get('/thanh-toan', (req, res) => {
    // res.render('payment');
    // })

    // app.get('/introduction', (req, res) => {
    // res.render('introduction');

    // })

    // app.get('/', (req, res) => {
    //     res.render('home');
    // })
}

module.exports = route;
