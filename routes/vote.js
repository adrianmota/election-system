const { Router } = require("express");
const router = Router();
const voteController = require("../controllers/voteController");

router.get("/", voteController.getIndex);
router.get("/candidates/:electivePositionId", voteController.getCandidates);
router.post("/createVote", voteController.postCreate);

module.exports = router;