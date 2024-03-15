class SearchController {
    // -GET -> path(/news)
    index(req, res) {
        res.render('search');
    }
}

module.exports = new SearchController();
