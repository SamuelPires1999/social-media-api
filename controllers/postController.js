const User = require("../models/user.model");
const Post = require("../models/post.model");

class postController {
  async makePost(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId });
      const newPost = new Post({
        ownerId: req.userId,
        ownerName: user.name,
        content: req.body.content,
      });

      await newPost.save();

      console.log("A user just made a new post!");
      res.status(200).send("post made");
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPosts(_, res) {
    const posts = await Post.find({});

    res.json(posts);
  }
}

module.exports = new postController();
