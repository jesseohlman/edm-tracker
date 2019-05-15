const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.post("/songs/favorite", favoriteController.favorite);
router.post("/songs/unfavorite", favoriteController.unfavorite);
router.get("/users/profile/favorites", favoriteController.favoritesPage);

module.exports = router;