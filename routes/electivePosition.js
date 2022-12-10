const { Router } = require("express");
const router = Router();
const electivePositionController = require("../controllers/electivePositionController");
const isAuth = require("../middleware/is-auth");

router.get("/electivePositions",isAuth, electivePositionController.getIndex);
router.post(
  "/createElectivePosition",isAuth,
  electivePositionController.postCreateElectivePosition
);
router.post(
  "/editElectivePosition/:id",isAuth,
  electivePositionController.postEditElectivePosition
);
router.post(
  "/changeElectivePositionStatus/:id",isAuth,
  electivePositionController.postChangeElectivePositionStatus
);

module.exports = router;