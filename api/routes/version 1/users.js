//@ts-check
const express = require("express");
const router = express.Router();

const SecurityController = require("../../controllers/version 1/security");

router.put("/", SecurityController.Signin);
router.post("/", SecurityController.Login);
router.delete("/", SecurityController.Logout);

module.exports = router;