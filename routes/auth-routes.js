const express = require('express');
const { check } = require('express-validator');
//const User = require('../models/user');

const authControllers = require('../controllers/auth-controllers');

const router = express.Router();

router.post("/mentee/signup", authControllers.menteeSignup);

module.exports = router;