import { Token, ITokenModel } from "../../models/blacklist";

export async function logout(token: string) {
  let blacklisted: ITokenModel;

  try {
    blacklisted = await Token.create(token);
  } catch (e) {
    throw Error("Cannot logout!");
  }
}
