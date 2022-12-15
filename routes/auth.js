const express = require("express");

const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/login", authController.GetLogin);
router.post("/login", authController.PostLogin);
router.post("/loginCitizen", authController.PostLoginCitizen);
router.post("/logout", isAuth, authController.Logout);

module.exports = router;
