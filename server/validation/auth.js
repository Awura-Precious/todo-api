const jwt = require("jsonwebtoken");

exports.authToken = (req, res, next) => {
  const accessKey = process.env.JWT_SECRETkey;
  //getting authorization header
  const authHeader = req.headers["authorization"];

  //get token portion from [BEARER TOKEN]
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.send("undefined");

  //verify token
  jwt.verify(token, accessKey, (err, user) => {
    if (err) return res.send(err);
    req.user = user;
    next();
  });
};
