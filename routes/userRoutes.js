const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", controller.listAll);
router.delete("/", controller.delete);

module.exports = router;
