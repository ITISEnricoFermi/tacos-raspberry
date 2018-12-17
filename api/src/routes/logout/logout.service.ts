import { User, IUserModel } from "../../models/user";

export async function logout(token: string) {
  let user: IUserModel;

  try {
    // @ts-ignore
    user = await User.findByToken(token);
  } catch (e) {
    throw Error("Unable to find user");
  }

  try {
    await user.removeToken(token);
  } catch (e) {
    throw Error("Cannot logout!");
  }
}
