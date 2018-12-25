import { User, IUserModel } from "../../models/user";

export async function login(
  username: string,
  password: string
): Promise<string> {
  // @ts-ignore
  return await User.findByCredentials(username, password).then(
    (user: IUserModel) => user.generateAuthToken()
  );
}
