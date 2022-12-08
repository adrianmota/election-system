const { Router } = require("express");
const router = Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.getIndex);

module.exports = router;