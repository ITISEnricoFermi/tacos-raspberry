import express from "express";
import _ from "lodash";
import * as Service from "./login.service";

const router = express.Router();

router.put("/", async (req: any, res: any) => {
  const body = _.pick(req.body, ["username", "password"]);
  try {
    let token: string = await Service.login(body.username, body.password);
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
