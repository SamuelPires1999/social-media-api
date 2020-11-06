const User = require("../models/user.model");
const FriendRequest = require("../models/friendRequest.model");

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

  async requestFriend(req, res) {
    try {
      const friendRequest = new FriendRequest({
        senderId: req.userId,
        receiverId: req.params.id,
      });

      await friendRequest.save();
      res.json({
        message: "Friend Request sent!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addFriend(req, res) {
    try {
      await FriendRequest.updateOne({ _id: req.params.id }, { status: true });
    } catch (error) {
      console.log(error);
    }

    res.json({
      message: "Friend added",
    });
  }

  async deleteUser(req, res) {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.send("User deleted");
    } catch (error) {
      console.log(error);
    }
  }

  async declineRequest(req, res) {
    try {
      await FriendRequest.deleteOne({ _id: req.params.id });
      res.send("friend request declined!");
    } catch (error) {
      res.send("fail");
      console.log(error);
    }
  }
}

module.exports = new userController();
