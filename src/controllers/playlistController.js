const playlistQueries = require("../db/playlist.queries");
const songQueries = require("../db/song.queries");

module.exports = {
    create(req, res, next){
        playlistQueries.createPlaylist(req, (err, playlist) => {
            if(err){
                req.flash("error", err);
                res.redirect("/");
            } else {
                res.redirect("/users/profile");
            }
        })
    },

    add(req, res, next){
        playlistQueries.getPlaylists(req, (err, playlists) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
            songQueries.getSong(req.body.songId, (err, song) => {
                if(err){
                    req.flash("error", err);
                    res.redirect("back");
                } else {
                    res.render("playlist/add", {song, playlists})
                }
            });
        }
    });
    },

    addSong(req, res, next){
        playlistQueries.addSong(req, (err, playItem) => {
            if(err){
                req.flash("error", err);
                res.redirect("/");
            } else {
                res.redirect("/users/profile");
            }
        })
    },

    playlists(req, res, next){
        playlistQueries.getPlaylists(req, (err, playlists) => {
            if(err){
                req.flash("error", err);
                res.redirect("/");
            } else {
                res.render("playlist/playlists", {playlists});
            }
        })
    },

    show(req, res, next){
        playlistQueries.getPlayWithSongs(req.params.id, (err, playlist) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/profile");
            } else {
                res.render("playlist/show", {playlist});
            }
        });
    }
}