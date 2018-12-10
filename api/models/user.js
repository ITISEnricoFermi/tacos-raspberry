//@ts-check
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: "{VALUE} is not a valid email."
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObj = user.toObject();

  return _.pick(userObj, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, "<<#[TheTokenSalt]#>>")
    .toString();
  user.tokens.push({ access, token });
  return user.save().then(() => token);
};

UserSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, "<<#[TheTokenSalt]#>>");
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    // @ts-ignore
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({ email }).then(user => {
    if (!user) return Promise.reject(new Error("User not Found!"));
    return bcrypt.compare(password, user.password).then(ok => {
      if (!ok) return Promise.reject(new Error("Incorret password!"));
      return user;
    });
  });
};

UserSchema.pre("save", function(next) {
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

const User = mongoose.model("User", UserSchema);

module.exports = { User };
