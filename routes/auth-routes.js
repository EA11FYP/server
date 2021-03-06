const express = require('express');
const { check } = require('express-validator');
//const User = require('../models/user');

const authControllers = require('../controllers/auth-controllers');

const router = express.Router();

router.post("/mentee/signup", [
    check('password').isLength({ min: 6 })
], authControllers.menteeSignup);

router.post("/mentor/signup", [
  check('password').isLength({ min: 6 })
], authControllers.mentorSignup);

router.post("/mentee/login", authControllers.menteeLogin);

router.post("/mentor/login", authControllers.mentorLogin);

router.get("/logout", authControllers.logout);

router.get("/current-user", authControllers.currentUser);



module.exports = router;