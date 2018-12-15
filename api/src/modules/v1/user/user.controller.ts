//@ts-check
import _ from "lodash";
import * as Service from "./user.service";

export async function signin(req: any, res: any) {
  let body = _.pick(req.body, ["email", "password"]);
  try {
    let token = await Service.register(body.email, body.password);
    res.header("x-auth", token).json({
      status: 200,
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
      message: "Succesfully loged out!"
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

export async function login(req: any, res: any) {
  let body = _.pick(req.body, ["email", "password"]);
  try {
    let token = await Service.login(body.email, body.password);
    res.header("x-auth", token).json({
      status: 200,
      token
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

function handleInternalError(res: any, e: any) {
  res.json({
    status: 400,
    message: res.app.get("env") === "development" ? e.message : ""
  });
}
