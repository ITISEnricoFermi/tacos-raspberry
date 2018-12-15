//@ts-check
import _ from "lodash";
import * as Service from "./user.service";

export async function signin(req: any, res: any) {
  let body = _.pick(req.body, ["username", "password"]);

  try {
    let token = await Service.register(body.username, body.password);
    res.header("x-auth", token).json({
      status: 200,
      message: "Ok",
      token
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

export async function logout(req: any, res: any) {
  let token = req.header("x-auth");

  try {
    await Service.logout(token);
    res.json({
      status: 200,
      message: "Succesfully logged out!"
    });
  } catch (e) {
    res.state(400).json({
      status: 400,
      message: res.app.get("env") === "development" ? e.message : ""
    });
  }
}

export async function login(req: any, res: any) {
  let body = _.pick(req.body, ["username", "password"]);
  try {
    let token = await Service.login(body.username, body.password);
    res.header("x-auth", token).json({
      status: 200,
      message: "Ok",
      token
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

function handleInternalError(res: any, e: any) {
  res.state(401).json({
    status: 401,
    message: res.app.get("env") === "development" ? e.message : ""
  });
}
