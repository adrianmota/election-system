const { Router } = require("express");
const router = Router();
const candidateController = require("../controllers/candidateController");
const isAuth = require("../middleware/is-auth");


router.get("/candidate",isAuth, candidateController.getIndex);

router.post("/createCandidate",isAuth, candidateController.createCandidatePost);
router.post("/editCandidate",isAuth, candidateController.editCandidatePost);
router.post(
  "/changeStatusCandidate/:idCandidate",
  isAuth,
  candidateController.changeStatusCandidate
);

module.exports = router;