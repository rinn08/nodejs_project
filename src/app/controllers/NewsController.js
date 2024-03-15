class NewsController {
    // -GET -> path(/news)
    index(req, res) {
        res.render('news');
    }
    show(req, res) {
        res.send('123');
    }
    show2(req, res) {
        res.send('456');
    }
}

module.exports = new NewsController();
