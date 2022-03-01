const jwt = require("jsonwebtoken");
module.exports /*.verifyToken*/ = (req, res, next) => {
  const token = req.header("access_token");
  // console.log(token);
  if (!token) {
    return res.status(401).json(" No token provided");
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);
   // console.log(verifiedUser)
    req.verifiedUser = verifiedUser;
    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};
