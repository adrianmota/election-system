const { Router } = require("express");
const router = Router();
const electivePositionController = require("../controllers/electivePositionController");

router.get("/electivePositions", electivePositionController.getIndex);
router.post(
  "/createElectivePosition",
  electivePositionController.postCreateElectivePosition
);
router.post(
  "/editElectivePosition",
  electivePositionController.postEditElectivePosition
);
router.post(
    "/changeElectivePositionStatus",
    electivePositionController.postChangeElectivePositionStatus
)

module.exports = router;