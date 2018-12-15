import { User } from "./user.model";

export async function login(email: string, password: string) {
  // @ts-ignore
  return await User.findByCredentials(email, password).then(user =>
    user.generateAuthToken()
  );
}

export async function register(email: string, password: string) {
  let user;

  try {
    user = await new User({ email, password }).save();
  } catch (e) {
    throw Error("Invalid or already used email!");
  }

  try {
    return await user.generateAuthToken();
  } catch (e) {
    throw Error("Cant generate auth token!");
  }
}

export async function logout(token: string) {
  let user;

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
