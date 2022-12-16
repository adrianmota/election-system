const express = require("express");

const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");
const isAuthCitizen = require("../middleware/is-auth-citizen-login");

const router = express.Router();

router.get("/login",isAuthCitizen, authController.GetLogin);
router.post("/login",isAuthCitizen, authController.PostLogin);
router.post("/loginCitizen", authController.PostLoginCitizen);
router.post("/logout", isAuth, authController.Logout);

module.exports = router;
