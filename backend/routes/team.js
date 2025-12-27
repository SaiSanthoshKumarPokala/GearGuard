const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const teamController = require('../controllers/teamController');

router.post('/', auth, teamController.createTeam);
router.get('/', auth, teamController.getAllTeams);
router.get('/:id', auth, teamController.getTeamById);
router.put('/:id', auth, teamController.updateTeam);
router.delete('/:id', auth, teamController.deleteTeam);

module.exports = router;
