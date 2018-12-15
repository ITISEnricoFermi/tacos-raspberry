//@ts-check
import express from "express";
import users from "./user/user.route";
import devices from "./devices/devices.route";

const router = express.Router();

router.use("/users", users);
router.use("/devices", devices);

export default router;
