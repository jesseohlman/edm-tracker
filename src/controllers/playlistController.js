const playlistQueries = require("../db/playlist.queries");
const songQueries = require("../db/song.queries");

module.exports = {
    create(req, res, next){
        playlistQueries.createPlaylist(req, (err, playlist) => {
            if(err){
                req.flash("error", err);
                res.redirect("/");
            } else {
                if(typeof req.body.songId !== 'undefined'){
                    playlistQueries.addSong(playlist.id, req.body.songId, (err, playItem) => {

                        if(err){
                            req.flash("error", err);
                            res.redirect("/");
                        } else {
                            res.redirect("/users/playlist/playlists");
                        }
                    })
                } else {
                    res.redirect("/users/playlist/playlists");
                }
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
        playlistQueries.addSong(req.body.playlistId, req.body.songId, (err, playItem) => {
            if(err){
                req.flash("error", err);
                res.redirect("/")
            } else {
                res.redirect("/users/playlist/playlists");
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
                const songs = playlist.getSongs();
                res.render("playlist/show", {playlist, songs});
            }
        });
    },

    remove(req, res, next){
        playlistQueries.removeSong(req, (err, playItem) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/profile");
            } else {
                res.redirect("back");
            }
        })
    },

    delete(req, res, next){
        playlistQueries.deletePlaylist(req, (err, playlist) => {
            if(err){
                req.flash("error", err);
                res.redirect("/users/profile");
            } else {
                res.redirect("/users/playlist/playlists");
            }
        })
    }
}