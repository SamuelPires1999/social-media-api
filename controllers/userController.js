const User = require("../models/user.model");

class userController {
  async listAll(_, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.json({
        message: "error getting the users",
      });
    }
  }
  async delete() {
    console.log("delete route");
  }
}

module.exports = new userController();
