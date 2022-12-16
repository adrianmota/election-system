const { Router } = require("express");
const router = Router();
const electivePositionController = require("../controllers/electivePositionController");
const isAuth = require("../middleware/is-auth");
const electionActive = require("../middleware/is-election-active");

router.get("/electivePositions",isAuth, electivePositionController.getIndex);
router.post(
  "/createElectivePosition",isAuth,electionActive,
  electivePositionController.postCreateElectivePosition
);
router.post(
  "/editElectivePosition/:id",isAuth,electionActive,
  electivePositionController.postEditElectivePosition
);
router.post(
  "/changeElectivePositionStatus/:id",isAuth,electionActive,
  electivePositionController.postChangeElectivePositionStatus
);

module.exports = router;