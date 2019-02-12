//@ts-check
import express from "express";
import {
  getDevices,
  getDevice,
  changeState,
  getState,
  changeStateRGB
} from "./devices.controller";

const router = express.Router();

router.get("/", getDevices);
router.get("/:id", getDevice);

router.put("/:id/state", getState);
router.put("/:id/state/:state", changeState);
router.put("/:id/colors/:hex", changeStateRGB);

export default router;
