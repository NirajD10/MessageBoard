const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  let token;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_TOKEN_SECRET_MESSAGE
      );

      if (!decodedToken) {
        const error = new Error("Not authorized, token failed");
        error.statusCode = 401;
        throw error;
      }
      const user = await User.findById(decodedToken._id).select(
        "-hashedpassword"
      );
      req.user_id = user._id;
      next();
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
  if (!token) {
    const error = new Error("Not authorized, token failed");
    error.statusCode = 401;
    next(error)
  }
};
