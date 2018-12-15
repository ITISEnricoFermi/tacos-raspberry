//@ts-check
import express from "express";
import { getDevices, getDevice, changeState } from "./devices.controller";

const router = express.Router();

router.get("/", getDevices);
router.get("/:id", getDevice);

router.put("/:id/state/:state", changeState);

export default router;
