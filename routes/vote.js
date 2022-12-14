const { Router } = require("express");
const router = Router();
const voteController = require("../controllers/voteController");

router.get("/", voteController.getIndex);
router.get("/candidates/:electivePositionId", voteController.getCandidates);

module.exports = router;