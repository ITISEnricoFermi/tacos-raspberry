import express from "express";
import _ from "lodash";
import * as Service from "./logout.service";
import { authenticate } from "../../middleware/auth";

const router = express.Router();

router.delete("/", authenticate, async (req: any, res: any) => {
  let token = req.header("x-auth");

  try {
    await Service.logout(token);
    res.json({
      status: 200,
      message: "Succesfully logged out!"
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: res.app.get("env") === "development" ? e.message : ""
    });
  }
});

export default router;
