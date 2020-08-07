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

exports.menteeSignup = menteeSignup;
exports.mentorSignup = mentorSignup;