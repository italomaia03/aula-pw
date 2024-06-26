const userService = require("../services/userService");
class UserController {
  async getAll(req, res) {
    const users = await userService.getAll();
    return res.status(200).json(users);
  }
}

module.exports = new UserController();
