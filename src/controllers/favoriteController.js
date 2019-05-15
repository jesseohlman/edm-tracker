
const favoriteQueries = require("../db/favorite.queries");

module.exports = {
    favorite(req, res, next){
        favoriteQueries.createFavorite(req, (err, favorite) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.redirect("back");
            }
        })
    },

    unfavorite(req, res, next){
        favoriteQueries.deleteFavorite(req, (err, favorite) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.redirect("back");
            }
        })
    },

    favoritesPage(req, res, next){
        favoriteQueries.getFavSongs(req, (err, songs) => {
            if(err){
                req.flash("error", err);
                res.redirect("back");
            } else {
                res.render("favorite/favorites", {songs});
            }
        })
    }
}