const { validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/user');
const Mentee = require('../models/mentee');
const Mentor = require('../models/mentor');

const HttpError = require('../models/http-error');

const menteeSignup =  (req, res, next) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
        res.send({
            success: false,
            message: "Invalid inputs passed, please check your data."
        })
        return next (
            new HttpError('Invalid inputs passed, please check your data.', 422)
        ) 
     //return res.send(errors.array())
     }

    let { username, password, name } = req.body;

    let newUser = new User({username: username, userType: "mentee"});
    
    User.register(newUser, password, (err, user) => {
        if(err){
            new HttpError('User exists', 400);
            return res.send({
                success: false,
                message: "User exists"
            })
        }
        passport.authenticate("local")(req, res, async () => {
            let newMentee = new Mentee({name: name, credentials: newUser._id});
            await newMentee.save();
            res.send({
                success: true,
                message: "Mentee registered successfully",
                info: newMentee
            });
        });
    });
}

const mentorSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    res.send({
        success: false,
        message: "Invalid inputs passed, please check your data."
    })
    return next (
        new HttpError('Invalid inputs passed, please check your data.', 422)
    )} 
    
    
    let { username, password, name } = req.body;

    let newUser = new User({username: username, userType: "mentor"});
    
    User.register(newUser, password, (err, user) => {
        if(err){
            new HttpError('User exists', 400);
            return res.send({
                success: false,
                message: "User exists"
            })
        }
        passport.authenticate("local")(req, res, async () => {
            let newMentor = new Mentor({name: name, credentials: newUser._id});
            await newMentor.save();
            res.send({
                success: true,
                message: "Mentor registered successfully",
                info: newMentor
            });
        });
    });

}

const menteeLogin = (req, res, next) => {

    passport.authenticate('local', async (err, user, info) => {
        if (err) { 
            return res.send({
                success: false,
                message: "Something went wrong, please try again"
            })
        }
        if (!user) { 
            return res.send({
                success: false,
                message: "Sign-in failed!"
            })
        }
        let userInfo = await Mentee.findOne({credentials:user._id});
        req.logIn(user, (err) => {
            if (err) { 
                return res.send({
                    success: false,
                    message: "Something went wrong, please try again"
                })
            }
            if(userInfo == null){
                return res.send({
                    success: false,
                    message: "User does not exists, Signup for free"
                })
            }
            return res.send({
                success: true,
                message: "successfully logged in",
                info: userInfo
            })
        });
      })(req, res, next);
}

const mentorLogin = (req, res, next) => {

    passport.authenticate('local', async (err, user, info) => {
        if (err) { 
            return res.send({
                success: false,
                message: "Something went wrong, please try again"
            })
        }
        if (!user) { 
            return res.send({
                success: false,
                message: "User does not exists, Signup for free"
            })
        }
        let userInfo = await Mentor.findOne({credentials:user._id});
        req.logIn(user, (err) => {
            if (err) { 
                return res.send({
                    success: false,
                    message: "Something went wrong, please try again"
                })
            }
            if(userInfo == null){
                return res.send({
                    success: false,
                    message: "User does not exists, Signup for free"
                })
            }
            return res.send({
                success: true,
                message: "successfully logged in",
                info: userInfo
             })
        });
      })(req, res, next);
}

const logout = (req, res, next) => {
    req.logout();
    res.send({
        success: true,
        message: "Sucessfully logged out"
    });
}

exports.menteeSignup = menteeSignup;
exports.mentorSignup = mentorSignup;
exports.menteeLogin = menteeLogin;
exports.mentorLogin = mentorLogin;
exports.logout = logout;