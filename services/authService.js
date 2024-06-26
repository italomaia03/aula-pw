const userModel = require("../models/loginSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (UserData) => {
  const { password } = UserData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  Object.assign(UserData, { password: hashedPassword });
  return await userModel.create(UserData);
};

const login = async (user) => {
  const { username, password } = user;
  const findUser = await userModel.findOne({ username });
  if (!findUser) throw new Error("User not found");
  const isValidPassword = await bcrypt.compare(password, findUser.password);
  if (!isValidPassword) {
    throw new Error("Password is incorrect");
  }
  const token = generateToken(findUser);
  return { token };
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, "seu-segredo-jwt", {
    expiresIn: "1h",
  });
};

module.exports = {
  register,
  login,
};
