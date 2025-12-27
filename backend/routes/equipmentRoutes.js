const router = require("express").Router();
const { createEquipment, getEquipment } = require("../controllers/equipmentController");

router.post("/", createEquipment);
router.get("/", getEquipment);

module.exports = router;
