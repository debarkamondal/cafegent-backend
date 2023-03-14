const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const getUser = (req, res, next) => {
  const token = req.header("authToken");
  if (!token) res.status(401).json({ error: "Please book a table first" });
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.body._id = data._id;
    next();
  } catch (error) {
    res.status(401).send({ error: "Access unauthorized" });
  }
};

module.exports = getUser;
