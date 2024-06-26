const userModel = require("../models/loginSchema");

const getAll = async () => {
  return await userModel.find();
};

module.exports = { getAll };
