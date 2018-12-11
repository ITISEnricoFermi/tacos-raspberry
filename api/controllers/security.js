//@ts-check
const _ = require("lodash");
const SecurityService = require("../services/security");
const { User } = require("../models/user");

exports.authenticate = async (req, res, next) => {
  let nonSecurePaths = ["/users", "/users/"];

  if (_.indexOf(nonSecurePaths, req.path) !== -1) return next();

  if (req.method === "OPTIONS") return next();
  let token = req.header("x-auth");
  try {
    // @ts-ignore
    let user = await User.findByToken(token);
    if (!user) throw Error("User not found.");
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized"
    });
  }
};

exports.Signin = async (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  try {
    let token = await SecurityService.Register(body.email, body.password);
    res.header("x-auth", token).json({
      status: 200,
      token
    });
  } catch (e) {
    res.status(400).json({
      status: 400,
      message: e.message
    });
  }
};

exports.Logout = async (req, res) => {
  let token = req.header("x-auth");

  try {
    await SecurityService.Logout(token);
    res.json({
      status: 200,
      message: "Succesfully loged out!"
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e.message
    });
  }
};

exports.Login = async (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);
  try {
    let token = await SecurityService.Login(body.email, body.password);
    res.header("x-auth", token).json({
      status: 200,
      token
    });
  } catch (e) {
    res.json({
      status: 400,
      message: e.message
    });
  }
};
