const express = require("express");
const router = express.Router();

const playlistController = require("../controllers/playlistController");

router.post("/users/playlist/create", playlistController.create);
router.post("/users/playlist/addSong", playlistController.addSong);
router.get("/users/playlist/playlists", playlistController.playlists);
router.get("/users/playlist/playlists/:id", playlistController.show);
router.post("/users/playlist/playlists/:id/remove", playlistController.remove);
router.get("/users/playlist/playlists/:id/delete", playlistController.delete);



//renders page
router.post("/users/playlist/add", playlistController.add);

module.exports = router;