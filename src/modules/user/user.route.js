const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const { checkAdmin } = require("../authorization/authorization.controller");

module.exports = router;

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update); // { password: 'newPassword' }
router.delete("/:id", checkAdmin, controller._delete);
