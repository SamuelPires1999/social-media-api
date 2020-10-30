// middleware that makes the authentication procces, to be used in routes that need to have an user logged in to get information
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const headerAuth = req.headers.authorization;

  //requisition came without the authorization header
  if (!headerAuth) return res.status(404).send("Access Denied");

  //token comes with "bearer" written before it, we need to remove that word
  const [_, token] = headerAuth.split(" ");

  //payload its the pack of information that returns after the token is verified
  try {
    const payload = jwt.verify(token, process.env.jwt_secret);

    req.userId = payload.userId;

    return next();
  } catch (error) {
    //if the token is wrong
    return res.status(401).send("invalid token");
  }
};
