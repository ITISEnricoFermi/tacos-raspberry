//@ts-check
const express = require("express");
const v1 = require("./version 1/api");

const router = express.Router();

router.use("/v1", v1);

module.exports = router;
