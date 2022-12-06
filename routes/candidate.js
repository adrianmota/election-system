const { Router } = require("express");
const router = Router();
const candidateController = require("../controllers/candidateController");

router.get("/candidate", candidateController.getIndex);

router.post("/createCandidate", candidateController.createCandidatePost);
router.post("/editCandidate", candidateController.editCandidatePost);
router.post(
  "/changeStatusCandidate/:idCandidate",
  candidateController.changeStatusCandidate
);

module.exports = router;