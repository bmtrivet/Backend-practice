const Router = require("express");
const router = new Router();
const newsRouter = require("./news");
const userRouter = require("./user");

router.use("/user", userRouter);
router.use("/news", newsRouter);

module.exports = router;
