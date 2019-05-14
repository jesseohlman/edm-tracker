const express = require("express");
const router = express.Router();

const songController = require("../controllers/songController");

router.get("/songs/new", songController.newForm);
router.post("/songs/create", songController.create);
router.post("/songs/play", songController.countPlays);


router.get("/songs/topDubstep", songController.topDubstep);
router.get("/songs/topHouse", songController.topHouse);
router.get("/songs/topPsytrance", songController.topPsytrance);
router.get("/songs/topExperimental", songController.topExperimental);
router.get("/songs/topD&B", songController.topDandB);


module.exports = router;