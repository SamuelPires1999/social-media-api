const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, userController.listAll);
router.get("/showFriends", authMiddleware, userController.listFriends);
router.post("/friends/:id", authMiddleware, userController.requestFriend);
router.patch("/friends/:id", authMiddleware, userController.addFriend);
router.delete("/friends/:id", authMiddleware, userController.declineRequest);
router.delete("/:id", userController.deleteUser);

module.exports = router;
