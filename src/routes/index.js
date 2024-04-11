const newsRouter = require('./news');
const searchRouter = require('./search');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const usersRouter = require('./users');

function route(app) {
    app.use((req, res, next) => {
        res.locals.isLoggedIn = !!req.session.userId;
        next();
    });

    app.use('/news', (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    }, newsRouter);

    app.use('/search', (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    }, searchRouter);

    app.use('/courses', (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    }, coursesRouter);

    app.use('/me', (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    }, meRouter);

    // Không áp dụng kiểm tra đăng nhập cho route '/users' vì nó cần cho việc đăng nhập và đăng ký
    app.use('/users', usersRouter);
    
    app.use('/', (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    }, siteRouter);

    app.use((req, res) => {
      res.status(404).render('404');
    });
}

module.exports = route;
