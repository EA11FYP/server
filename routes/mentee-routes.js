const express = require('express');
const router = express.Router();

const menteeControllers = require('../controllers/mentee-controllers');

router.get('/:id',menteeControllers.menteeById);
router.get('/requests/all/:id', menteeControllers.allReq);

module.exports = router;