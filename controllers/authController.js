const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

class authController {
  async register(req, res) {
    try {
      const newUser = new User({
        name: req.body.data.name,
        password: req.body.data.password,
        email: req.body.data.email,
      });

      await newUser.save();

      res.json({
        message: "user added",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    const { email, password } = req.body.data;
    let user;
    try {
      user = await User.findOne({ email, password });
    } catch (error) {
      console.log(error);
    }

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        status: "404",
      });
    }

    return res.json({
      token: jwt.sign({ userId: user._id }, process.env.jwt_secret, {
        expiresIn: "30 minutes",
      }),
    });
  }
}

module.exports = new authController();
