//@ts-check
const { User } = require("../models/user");

exports.Login = async (email, password) => {
  // @ts-ignore
  return await User.findByCredentials(email, password).then(user =>
    user.generateAuthToken()
  );
};

exports.Register = async (email, password) => {
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
};

exports.Logout = async token => {
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
};
