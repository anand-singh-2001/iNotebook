const jwt = require("jsonwebtoken");
const JWT_SECRET = "This is the secret token";

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to req body
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "JWT_SECRET");
    req.user = data.user;
    next(); //run or execute the code after all the middleware function is finished.
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
