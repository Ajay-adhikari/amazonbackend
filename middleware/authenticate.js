const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretkey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazonweb;
    const verifyToken = jwt.verify(token, secretkey);
    // console.log(verifyToken);
    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);
    if(!rootUser)
    {
        throw new Error("user notn found");
    }
    req.token=token
    req.rootUser=rootUser;
    req.userID=rootUser._id;

    next();
  } catch(e) {
    res.status(401).send("unauthorised :No token provide");
    // console.log(e);

  }
};
module.exports=authenticate;
