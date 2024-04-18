class RoadmapController {
    // -GET -> path(/roadmap)
    index(req, res) {
        res.render("roadMap");
    }
}

module.exports = new RoadmapController();
