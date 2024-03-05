const {verifyToken} = require("../helpers/jwt");
const {User} = require('../models');

module.exports = async function authentication(req, res, next) {
    // acces authorization dari header
    try {
      const { authorization } = req.headers;
      // console.log({ authorization });
      if (!authorization) {
        throw { name: "ForbiddenAccess" };
      }
      // pecah nilai authorization
      const rawToken = authorization.split(" ");
      if (rawToken[0] !== "Bearer") {
        throw { name: "InvalidToken" };
      }
      const result = verifyToken(rawToken[1]);
      
      const user = await User.findByPk(result.id)
      if(!user) {
        throw { name: "ForbiddenAccess" };
      }
  
      req.user = user
  
      console.log(result);
  
      next();
    } catch (error) {
      // console.log(error);
      next(error)
    }
  }
