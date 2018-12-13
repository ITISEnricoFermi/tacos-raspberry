//@ts-check
const express = require("express");
const users = require("./users");
const devicesRouter = require("./devices");

const router = express.Router();

router.use("/users", users);
router.use("/devices", devicesRouter);

module.exports = router;
