const newsRouter = require('./news');
const searchRouter = require('./search');
const homeRouter = require('./home');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const usersRouter = require('./users');
const roadmap = require('./roadmap');

function route(app) {
    app.use((req, res, next) => {
        res.locals.isLoggedIn = !!req.session.userId;
        next();
    });
    app.use('/roadmap', (req, res, next) => {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }
        next();
    }, newsRouter);
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
        next();
    }, homeRouter);
    app.use(async (req, res, next) => {
        if (req.session.userId) {
            const user = await mongoose.model('User').findById(req.session.userId);
            res.locals.currentUser = user;
        }
        next();
    });
    app.use((req, res) => {
        res.status(404).render('404');
    });
}

module.exports = route;
