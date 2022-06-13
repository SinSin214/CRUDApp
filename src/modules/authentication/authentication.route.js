const express = require("express");
const router = express.Router();
const controller = require("./authentication.controller");

module.exports = router;

router.post("/register", controller.actionRegister);
router.post("/login", controller.actionLogIn); // { UserName: '', Password: '' }
router.post("/refresh-token", controller.actionRefreshToken); //{ refreshToken }, header: token
