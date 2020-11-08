const router = require("express").Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/makePost", authMiddleware, postController.makePost);
router.get("/", postController.getAllPosts);

module.exports = router;
