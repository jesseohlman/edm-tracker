const songQueries = require("../db/song.queries");

module.exports = {
    index(req, res, next){
        songQueries.getTop10((err, songs) => {
            if(err){
                req.flash("error", err);
                res.redirect("/songs/topdubstep");
            } else {
                res.render("static/index", {songs});
            }
        })
    }
}