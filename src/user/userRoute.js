const express = require("express");
const router = express.Router();
const controller = require("./userController");

module.exports = router;

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create); //{ username: '', password: ''}
router.put("/:id", controller.update); // { password: 'newPassword' }
router.delete("/:id", controller._delete);
