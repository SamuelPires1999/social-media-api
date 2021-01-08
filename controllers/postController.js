const User = require("../models/user.model");
const Post = require("../models/post.model");

class postController {
  async makePost(req, res) {
    try {
      const newPost = new Post({
        owner: req.userId,
        content: req.body.data.content,
      });
      await newPost.save();

      console.log("A user just made a new post!");
      res.status(200).send("post made");
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPosts(_, res) {
    const posts = await Post.find({}).populate("owner");

    res.json(posts);
  }
}

module.exports = new postController();
