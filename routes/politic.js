const { Router } = require("express");
const router = Router();
const politicController = require("../controllers/politicController");
const isAuth = require("../middleware/is-auth");

router.get("/politics",isAuth, politicController.getIndex);
router.post("/createPolitic",isAuth, politicController.postCreatePolitic);
router.post("/editPolitic/:id",isAuth, politicController.postEditPolitic);
router.post("/changePoliticStatus/:id",isAuth, politicController.postChangePoliticStatus);

module.exports = router;