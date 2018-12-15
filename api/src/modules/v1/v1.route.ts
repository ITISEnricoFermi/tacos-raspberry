//@ts-check
import express from "express";
import users from "./user/user.route";
import devices from "./devices/devices.route";
import { authenticate } from "../v1/auth/auth.controller";

const router = express.Router();

router.use(authenticate);
router.use("/user", users);
router.use("/devices", devices);

export default router;
