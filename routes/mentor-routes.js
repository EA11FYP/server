const express = require('express');
const router = express.Router();

const mentorController = require('../controllers/mentor-controllers');

router.get('/', mentorController.allMentors);

router.get('/requests/all/:id', mentorController.allReq);

module.exports = router;