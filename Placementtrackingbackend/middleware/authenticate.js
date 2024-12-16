const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing!" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "AZQ,PI)0(");
    req.User = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({
      message: "Authentication Failed!",
      error: error.message,
    });
  }
};

module.exports = authenticate;
