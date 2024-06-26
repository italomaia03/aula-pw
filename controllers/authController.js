class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || username.length === 0) {
        throw new Error("Username is required");
      }
      if (!password || password.length === 0) {
        throw new Error("Password is required");
      }
      const { token } = await authService.login({ username, password });
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async register(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || username.length === 0) {
        throw new Error("Username is required");
      }
      if (!password || password.length === 0) {
        throw new Error("Password is required");
      }
      const response = await authService.register({ username, password });
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

const authService = require("../services/authService");
module.exports = new AuthController(authService);
