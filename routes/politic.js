const { Router } = require("express");
const router = Router();
const politicController = require("../controllers/politicController");

router.get('admin/politics', politicController.getIndex);
router.post('admin/createPolitic', politicController.postCreatePolitic);
router.post('admin/editPolitic', politicController.postEditPolitic);
router.post('admin/deletePolitic', politicController.postDeletePolitic);

module.exports = router;