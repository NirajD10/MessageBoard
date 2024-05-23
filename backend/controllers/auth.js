const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_TOKEN_SECRET_MESSAGE, {
    expiresIn: "24hr",
  });
};

exports.registerAccount = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const error = new Error("Incomplete input.");
      error.statusCode = 422;
      throw error;
    }

    const exitsaccount = await User.findOne({ email: email });
    if (exitsaccount) {
      const error = new Error("This account already exists. please sign it.");
      error.statusCode = 409;
      throw error;
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      hashedpassword: hashedPass,
    });
    const result = await user.save();

    if (result) {
      const token = generateToken({
        _id: result.id,
        name: result.name,
        email: email,
      });
      res.status(200).json({
        message: "Successfully Registered.",
        user: {
          _id: result.id,
          name: result.name,
          email: email,
        },
        token: token,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.loginAccount = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const error = new Error("Incomplete input.");
      error.statusCode = 422;
      throw error;
    }

    const checkuser = await User.findOne({ email: email });
    if (!checkuser) {
      const error = new Error("This account doesn't exists!");
      error.statusCode = 401;
      throw error;
    }

    const checkpass = await bcrypt.compare(password, checkuser.hashedpassword);
    if (!checkpass) {
      const error = new Error("Incorrect email or password.");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({
      _id: checkuser._id,
      name: checkuser.name,
      email: checkuser.email,
    });

    res.status(200).json({
      message: "Sucessful signed in.",
      user: {
        _id: checkuser._id,
        name: checkuser.name,
        email: checkuser.email,
      },
      token: token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
