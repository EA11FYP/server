const express = require('express');
const { check } = require('express-validator');
//const User = require('../models/user');

const authControllers = require('../controllers/auth-controllers');

const router = express.Router();

router.post("/signup", [
    check('username')
      .normalizeEmail() 
      .isEmail(),
    check('password').isLength({ min: 6 })
  ], authControllers.signup);

module.exports = router;