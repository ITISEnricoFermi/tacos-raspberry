//@ts-check
const express = require("express");
const router = express.Router();

const SecurityController = require("../../controllers/version 1/security");

router.put("/login", SecurityController.Login);
router.delete("/logout", SecurityController.Logout);
router.post("/", SecurityController.Signin);

module.exports = router;
