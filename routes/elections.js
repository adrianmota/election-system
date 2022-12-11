const { Router } = require("express");
const router = Router();
const electionController = require("../controllers/electionController");
const isAuth = require("../middleware/is-auth");

router.get("/election", isAuth,electionController.getIndex);

router.post("/createElection",isAuth, electionController.createElectionPost);
router.post("/editElection",isAuth, electionController.editElectionPost);
router.post(
  "/changeStatusElection/:idElection",
  isAuth,
  electionController.changeStatusElection
);

module.exports = router;