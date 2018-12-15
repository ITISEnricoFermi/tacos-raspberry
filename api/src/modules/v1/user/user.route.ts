//@ts-check
import express from "express";
import * as Controller from "./user.controller";

const router = express.Router();

router.put("/login", Controller.login);
router.delete("/logout", Controller.logout);
router.post("/", Controller.signin);

export default router;
