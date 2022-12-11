const { Router } = require("express");
const router = Router();
const citizenController = require("../controllers/citizenController");
const isAuth = require("../middleware/is-auth");

router.get("/citizen", isAuth,citizenController.getIndex);

router.post("/createCitizen",isAuth, citizenController.createCitizenPost);
router.post("/editCitizen",isAuth, citizenController.editCitizenPost);
router.post(
  "/changeStatusCitizen/:idCitizen",
  isAuth,
  citizenController.changeStatusCitizen
);

module.exports = router;