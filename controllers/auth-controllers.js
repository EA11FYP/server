const { validationResult } = require('express-validator');
const passport = require('passport');
const Users = require('../models/user');

const HttpError = require('../models/http-error');

const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next (
        new HttpError('Invalid inputs passed, please check your data.', 422)
      ) 
    }

    let { username, password } = req.body;

    let newUser = new User({username: username});
    User.register(newUser, password, (err, user) => {
        if(err){
            return new HttpError('User exists', 400);
        }
        passport.authenticate("local")(req, res, () => {
            res.send("message: successfully registered");
        });
    });
}

exports.signup = signup;