const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const requestController = require('../controllers/requestController');

router.post('/', auth, requestController.createRequest);
router.get('/', auth, requestController.getAllRequests);
router.get('/statistics', auth, requestController.getStatistics);
router.get('/:id', auth, requestController.getRequestById);
router.put('/:id', auth, requestController.updateRequest);
router.delete('/:id', auth, requestController.deleteRequest);

module.exports = router;
