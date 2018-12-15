import { User, IUserModel } from "./user.model";

export async function login(username: string, password: string) {
  // @ts-ignore
  return await User.findByCredentials(username, password).then(user =>
    user.generateAuthToken()
  );
}

export async function register(username: string, password: string) {
  let user: IUserModel;

  try {
    user = await new User({ username, password }).save();
  } catch (e) {
    throw Error("Username already in used!");
  }

  try {
    return await user.generateAuthToken();
  } catch (e) {
    throw Error("Cannot generate auth token!");
  }
}

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
