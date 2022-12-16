const { Router } = require("express");
const router = Router();
const citizenController = require("../controllers/citizenController");
const isAuth = require("../middleware/is-auth");
const electionActive = require("../middleware/is-election-active");

router.get("/citizen", isAuth,citizenController.getIndex);

router.post("/createCitizen",isAuth,electionActive, citizenController.createCitizenPost);
router.post("/editCitizen",isAuth,electionActive, citizenController.editCitizenPost);
router.post(
  "/changeStatusCitizen/:idCitizen",
  isAuth,
  electionActive,
  citizenController.changeStatusCitizen
);

module.exports = router;