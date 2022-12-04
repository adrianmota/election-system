const { Router } = require("express");
const router = Router();
const electivePositionController = require("../controllers/electivePositionController");

router.get("/electivePositions", electivePositionController.getIndex);
router.post(
  "/createElectivePosition",
  electivePositionController.postCreateElectivePosition
);
router.post(
  "/editElectivePosition/:id",
  electivePositionController.postEditElectivePosition
);
router.post(
  "/changeElectivePositionStatus/:id",
  electivePositionController.postChangeElectivePositionStatus
);

module.exports = router;