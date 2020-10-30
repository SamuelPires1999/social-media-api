const router = require("express").Router();

router.get("/", (_, res) => {
  res.json({
    message: "route that gets all users",
  });
});

router.get("/:id", (_, res) => {
  res.json({
    message: "route that gets a single user",
  });
});

router.delete("/:id", (_, res) => {
  res.json({
    message: "route for deleting a specified user",
  });
});

module.exports = router;
