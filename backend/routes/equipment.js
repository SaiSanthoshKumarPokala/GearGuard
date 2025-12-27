const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const equipmentController = require('../controllers/equipmentController');

router.post('/', auth, equipmentController.createEquipment);
router.get('/', auth, equipmentController.getAllEquipment);
router.get('/:id', auth, equipmentController.getEquipmentById);
router.get('/:id/requests', auth, equipmentController.getEquipmentRequests);
router.put('/:id', auth, equipmentController.updateEquipment);
router.delete('/:id', auth, equipmentController.deleteEquipment);

module.exports = router;
