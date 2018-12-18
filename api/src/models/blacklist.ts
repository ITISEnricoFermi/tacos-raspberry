import { model, Schema, Model, Document } from "mongoose";
import _ from "lodash";

export interface IToken {
  token: string;
}

export interface ITokenModel extends IToken, Document {
  //create(): Promise<Boolean>;
  //delete(): Promise<Boolean>;
  //find(): Promise<ITokenModel>;
}

export const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
});

TokenSchema.static("create", function(
  token: string,
): Promise<Boolean> {
  let Token = this;
  return Token.create({ token }).then((user: any) => {
    if (!user) return Promise.reject(new Error("User not found!"));
    return true;
    });
});

TokenSchema.static("delete", function(
    token: string,
  ): Promise<Boolean> {
    let Token = this;
    return Token.delete({ token }).then((token: any) => {
      if (!token) return Promise.reject(new Error("User not found!"));
      return true;
      });
  });

TokenSchema.static("find", function(
    token: string,
  ): Promise<Boolean> {
    let Token = this;
  return Token.findOne({ token }).then((token: any) => {
    if (!token) return Promise.reject(new Error("User not found!"));
      return token;
  });
});

export const Token: Model<ITokenModel> = model<ITokenModel>("Token", TokenSchema);

export default Token;
