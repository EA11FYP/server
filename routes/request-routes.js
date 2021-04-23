const express = require('express');
const router = express.Router();

const requestControllers = require('../controllers/request-controllers');

router.post('/', requestControllers.newRequest);
router.post('/action');
router.get('/all/mentor');
router.get('/all/mentee',requestControllers.allMentee);
router.get('/all', requestControllers.allreq);



module.exports = router