const { Router } = require("express");
const router = Router();
const voteController = require("../controllers/voteController");
const isCitizenAuth = require("../middleware/is-citizen-auth");

router.get("/", isCitizenAuth, voteController.getIndex);
router.get(
  "/candidates/:electivePositionId",
  isCitizenAuth,
  voteController.getCandidates
);
router.post("/createVote", isCitizenAuth, voteController.postCreate);
router.get("/end", isCitizenAuth, voteController.getEndVoteView);

module.exports = router;