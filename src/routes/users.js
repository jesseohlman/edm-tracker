const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const validation = require("./validatidate");

router.get("/users/customize", userController.customize);
router.get("/users/signup", userController.signup);
router.get("/users/signinForm", userController.signinForm);
router.get("/users/profile", userController.profile);
router.post("/users/create", validation.userValidate, userController.create);
router.post("/users/update", userController.update);
router.post("/users/signin", userController.signin);


module.exports = router;