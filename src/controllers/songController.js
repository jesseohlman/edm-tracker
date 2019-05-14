
const songQueries = require("../db/song.queries");

module.exports = {
    create(req, res, next){
        songQueries.addSong(req, (err, song) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
                req.flash("notice", "You have successfully added a song to the library");
                res.redirect("back");
            }
        })
    },

    newForm(req, res, next){
        res.render("songs/addSong")
    },

    countPlays(req, res, next){
        songQueries.updateSong(req, (err, song) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.redirect("back");
            }
        })
    },

    topDubstep(req, res, next){
        songQueries.getSongs("dubstep", (err, songs) => {
            if(err || songs.length <= 0){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.render("songs/topSongs", {songs});
            }
        })
    },

    topDandB(req, res, next){
        songQueries.getSongs("d&b", (err, songs) => {
            if(err || songs.length <= 0){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.render("songs/topSongs", {songs});
            }
        })
    },
    
    topPsytrance(req, res, next){
        songQueries.getSongs("psytrance", (err, songs) => {
            if(err || songs.length <= 0){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.render("songs/topSongs", {songs});
            }
        })
    },
    
    topHouse(req, res, next){
        songQueries.getSongs("house", (err, songs) => {
            if(err || songs.length <= 0){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.render("songs/topSongs", {songs});
            }
        })
    },
    
    topExperimental(req, res, next){
        songQueries.getSongs("experimental", (err, songs) => {
            if(err || songs.length <= 0){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.render("songs/topSongs", {songs});
            }
        })
    },
    
}