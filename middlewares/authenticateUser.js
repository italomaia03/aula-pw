const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not found" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, "seu-segredo-jwt");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token expired or invalid" });
  }
};

module.exports = authenticateUser;
