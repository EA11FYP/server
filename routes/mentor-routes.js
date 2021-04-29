const express = require('express');
const router = express.Router();

const mentorController = require('../controllers/mentor-controllers');

router.get('/', mentorController.allMentors);

router.get('/:id',mentorController.mentorById);

router.get('/requests/all/:id', mentorController.allReq);

router.get('/all/chatbot',mentorController.allMentorsChatbot);

module.exports = router;