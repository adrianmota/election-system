const {Router} = require("express");
const router = Router();

const citizenController = require("../controllers/citizenController");

router.get("/admin/citizen",citizenController.getIndex);

router.post("/admin/createCitzen",citizenController.createCitizenPost);
router.post("/admin/editCitezen",citizenController.editCitizenPost);
router.post("/admin/changeStatusCitizen",citizenController.changeStatusCitizen);



module.exports = router;

