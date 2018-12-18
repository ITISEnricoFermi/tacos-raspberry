import { User, IUserModel } from "../../../../models/user";

export async function register(username: string, password: string) {
  let user: IUserModel;

  try {
    user = await new User({ username, password }).save();
  } catch (e) {
    throw e;
  }

  try {
    return await user.generateAuthToken();
  } catch (e) {
    throw Error("Cannot generate auth token!");
  }
}
