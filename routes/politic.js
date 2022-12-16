const { Router } = require("express");
const router = Router();
const politicController = require("../controllers/politicController");
const isAuth = require("../middleware/is-auth");
const electionActive = require("../middleware/is-election-active");

router.get("/politics",isAuth, politicController.getIndex);
router.post("/createPolitic",isAuth,electionActive, politicController.postCreatePolitic);
router.post("/editPolitic/:id",isAuth,electionActive, politicController.postEditPolitic);
router.post("/changePoliticStatus/:id",isAuth,electionActive, politicController.postChangePoliticStatus);

module.exports = router;