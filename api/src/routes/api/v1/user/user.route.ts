import express from "express";
import _ from "lodash";
import * as Service from "./user.service";
import { authenticate } from "../../../../middleware/auth";

const router = express.Router();

router.post("/", authenticate, async (req: any, res: any) => {
  let body = _.pick(req.body, ["username", "password"]);

  try {
    let token = await Service.register(body.username, body.password);
    res.header("x-auth", token).json({
      status: 200,
      message: "Ok",
      token
    });
  } catch (e) {
    res.status(401).json({
      status: 401,
      message: res.app.get("env") === "development" ? e.message : ""
    });
  }
});

export default router;
