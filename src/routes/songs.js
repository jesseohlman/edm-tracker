const express = require("express");
const router = express.Router();

const songController = require("../controllers/songController");

router.get("/songs/new", songController.newForm);
router.post("/songs/create", songController.create);
router.post("/songs/:id/delete", songController.delete);
router.post("/songs/:id/update", songController.update);

router.post("/songs/play", songController.countPlays);
//create test for /songs/play
router.get("/songs/:id/edit", songController.edit);


router.get("/songs/topdubstep", songController.topDubstep);
router.get("/songs/tophouse", songController.topHouse);
router.get("/songs/toppsytrance", songController.topPsytrance);
router.get("/songs/topexperimental", songController.topExperimental);
router.get("/songs/topdandb", songController.topDandB);


module.exports = router;