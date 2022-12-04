const { Router } = require("express");
const router = Router();
const politicController = require("../controllers/politicController");

router.get("/politics", politicController.getIndex);
router.post("/createPolitic", politicController.postCreatePolitic);
router.post("/editPolitic/:id", politicController.postEditPolitic);
router.post("/changePoliticStatus/:id", politicController.postChangePoliticStatus);

module.exports = router;