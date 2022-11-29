const { Router } = require("express");
const router = Router();
const citizenController = require("../controllers/citizenController");

router.get("/citizen", citizenController.getIndex);

router.post("/createCitizen", citizenController.createCitizenPost);
router.post("/editCitizen", citizenController.editCitizenPost);
router.post(
  "/changeStatusCitizen/:idCitizen",
  citizenController.changeStatusCitizen
);

module.exports = router;