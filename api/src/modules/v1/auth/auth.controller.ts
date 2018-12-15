import _ from "lodash";
import { User, IUserModel } from "../user/user.model";

export async function authenticate(req: any, res: any, next: Function) {
  let nonSecurePaths = ["/user", "/user/", "/user/login"];

  if (_.indexOf(nonSecurePaths, req.path) !== -1) {
    return next();
  }

  if (req.method === "OPTIONS") return next();
  let token = req.header("x-auth");
  try {
    // @ts-ignore
    let user: IUserModel = await User.findByToken(token);
    if (!user) throw Error("User not found.");
    req.user = user;
    req.token = token;
    return next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized"
    });
  }
}

export default authenticate;
