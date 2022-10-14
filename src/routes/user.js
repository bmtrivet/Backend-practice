const Router = require("express");
const router = new Router();
const UserControllers = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/reg", UserControllers.registration);
router.post("/login", UserControllers.login);
router.get("/auth", authMiddleware, UserControllers.check);

module.exports = router;
