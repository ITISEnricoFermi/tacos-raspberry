//@ts-check
import express from "express";
import devices from "./devices/devices.route";

const router = express.Router();

router.use("/devices", devices);

export default router;
