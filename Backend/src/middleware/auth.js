const { verifyToken } = require("../utils/jwtUtils.js");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const user = verifyToken(token);
  if (!user)
    return res.status(403).json({ message: "Invalid or expired token" });

  req.user = user;
  next();
};

module.exports = auth;
