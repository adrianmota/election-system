const { Router } = require("express");
const router = Router();
const candidateController = require("../controllers/candidateController");
const isAuth = require("../middleware/is-auth");
const electionActive = require("../middleware/is-election-active");


router.get("/candidate",isAuth, candidateController.getIndex);

router.post("/createCandidate",isAuth,electionActive, candidateController.createCandidatePost);
router.post("/editCandidate",isAuth,electionActive, candidateController.editCandidatePost);
router.post(
  "/changeStatusCandidate/:idCandidate",
  isAuth,
  electionActive,
  candidateController.changeStatusCandidate
);

module.exports = router;