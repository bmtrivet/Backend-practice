const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNewsById);
router.post("/", checkRoleMiddleware("ADMIN"), newsController.createNews);
router.put("/:id", newsController.updateNewsById);
router.delete("/:id", newsController.deleteNewsById);

module.exports = router;
