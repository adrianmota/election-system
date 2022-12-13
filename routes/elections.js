const { Router } = require("express");
const router = Router();
const electionController = require("../controllers/electionController");
const isAuth = require("../middleware/is-auth");

router.get("/election", isAuth,electionController.getIndex);
router.get("/election/:idElection", isAuth,electionController.getResult);

router.post("/createElection",isAuth, electionController.createElection);
router.post("/closedElection/:idElection",isAuth, electionController.closedElection);

module.exports = router;