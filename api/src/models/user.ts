import { model, Schema, Model, Document, Query } from "mongoose";
import { config } from "../config/conf";
import jwt from "jsonwebtoken";
import _ from "lodash";
import bcrypt from "bcryptjs";
import { config } from "../../src/config/conf";

const jwt_secret = config.jwt_secret;

const TOKEN_SALT: string = config.jwt_salt;

export interface IUser {
  username: string;
  password: string;
  auth: number;
}

export interface IUserModel extends IUser, Document {
  toJson(): { _id: string; username: string };
  generateAuthToken(): Promise<string>;
  //findById(): Promise<IUserModel>;
  //findByCredentials(): Promise<IUserModel>;
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  auth: {
    type: Number,
    required: false,
  }
});

UserSchema.method("toJSON", function(): { _id: string; username: string } {
  let user = this;
  let userObj = user.toObject();

  return _.pick(userObj, ["_id", "username"]);
});

UserSchema.method("generateAuthToken", function(): Promise<string> {
  let user: IUserModel = this;
  let token = jwt.sign({ _id: user._id}, jwt_secret).toString();
  /*
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, TOKEN_SALT)
    .toString();
  user.tokens.push({ access, token });
*/
  return user.save().then(() => token);
});

UserSchema.static("findById", function(
  _id: string,
): Promise<IUserModel> {
  let User = this;

  return User.findOne({ _id }).then((user: any) => {
    if (!user) return Promise.reject(new Error("User not found!"));
    return user;
    });
/*
  let decoded;

  try {
    decoded = jwt.verify(token, TOKEN_SALT);
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    // @ts-ignore
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
*/
});

UserSchema.static("findByCredentials", function(
  username: string,
  password: string
): Promise<IUserModel> {
  let User = this;

  return User.findOne({ username }).then((user: any) => {
    if (!user) return Promise.reject(new Error("User not found!"));
    return bcrypt.compare(password, user.password).then((ok: boolean) => {
      if (!ok) return Promise.reject(new Error("Incorret password!"));
      return user;
    });
  });
});

UserSchema.pre("save", function(next: Function) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt
      .genSalt(10)
      // @ts-ignore
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => {
        // @ts-ignore
        user.password = hash;
        return next();
      });
  } else {
    next();
  }
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

export default User;
