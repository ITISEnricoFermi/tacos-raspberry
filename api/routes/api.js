//@ts-check
const express = require("express");
const v1 = require("./version 1/api");

const router = express.Router();

router.use("/v1", v1);

router.get("/", (req, res) => {
  res.status(200).send();
});
router.post("/", (req, res) => {
  res.status(200).send();
});
router.put("/", (req, res) => {
  res.status(200).send();
});
router.delete("/", (req, res) => {
  res.status(200).send();
});
router.options("/", (req, res) => {
  res.status(200).send();
});

module.exports = router;
