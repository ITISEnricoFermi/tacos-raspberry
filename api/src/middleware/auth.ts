import _ from "lodash";
import { User, IUserModel } from "../models/user";

export async function authenticate(req: any, res: any, next: Function) {
  let token = req.header("x-auth");
  try {
    // @ts-ignore
    let user: IUserModel = await User.findByToken(token);

    if (!user) throw Error("User not found.");

    return next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: `Unauthorized ${err.message}`
    });
  }
}

export default authenticate;
