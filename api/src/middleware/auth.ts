import _ from "lodash";
import { User } from "../models/user";
import passport from "passport";
import {Strategy as JwtStrategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import { config } from "../../src/config/conf";

const jwt_secret = config.jwt_secret;

var opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : jwt_secret,
}

export async function authenticate(req: any, res: any, next: Function) {
  passport.use(new JwtStrategy(opts, function(decoded, done) {            //not called
    try {
      User.findById(decoded._id);
      next();
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized"
      });
    }
  }));
/*
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
*/
}

export default authenticate;
