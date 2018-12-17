//@ts-check
import express from "express";
import { authenticate } from "../../../../middleware/auth";
import { getDevices, getDevice, changeState } from "./devices.controller";

const router = express.Router();

router.get("/", authenticate, getDevices);
router.get("/:id", authenticate, getDevice);

router.put("/:id/state/:state", authenticate, changeState);

export default router;
