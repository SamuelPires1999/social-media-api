const User = require("../models/user.model");
const FriendRequest = require("../models/friendRequest.model");

class userController {
  async listAll(req, res) {
    try {
      const users = await User.findOne({ _id: req.userId }).populate(
        "friendList"
      );
      res.json(users);
    } catch (error) {
      res.json({
        message: "error getting the users",
      });
    }
  }

  async listFriendRequests(req, res) {
    const result = await FriendRequest.find({})
      .populate("sender")
      .populate("receiver");
    res.json(result);
  }

  async listFriends(req, res) {
    const user = await FriendRequest.find({ _id: req.userId }).populate(
      "friendList"
    );

    res.json(user);
  }

  async requestFriend(req, res) {
    try {
      const friendRequest = new FriendRequest({
        sender: req.userId,
        receiver: req.params.id,
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
      //update the friends request collection
      await FriendRequest.updateOne({ _id: req.params.id }, { status: true });
      //add the receiver ID to the sender collection
      await User.updateOne({ _id: req.userId }, { friendList: req.params.id });
      //adding the sender ID to the receiver collection
      await User.updateOne({ _id: req.params.id }, { friendList: req.userId });
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
