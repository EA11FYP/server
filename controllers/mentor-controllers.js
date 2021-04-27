const Mentor = require('../models/mentor');
// const Mentee = require('../models/mentee');

const allMentors = async(req,res,next) => {
    Mentor.find({}, (err,result) => {
        if(err){
            return  res.status(400).send({
                 success: false,
                 message: "Unexpected error"
             });
         } else {
             res.send({
                 success: true,
                 message: "Sucessfully send all Mentors",
                 info: result.reverse()
             });
         }
    })
}

const allReq = async(req,res,next) => {
    Mentor.findById(req.params.id, (err, result) => {
        if(err){
            return  res.status(404).send({
                 success: false,
                 message: "Cannot find mentor"
            });
        } else {
            return res.status(200).send({
                success: true,
                info: result.requests
            })
        }
    }).populate('requests');
}

const mentorById = async(req,res,next) => {
    Mentor.findById(req.params.id, (err, result) => {
        if(err){
            return  res.status(404).send({
                 success: false,
                 message: "Cannot find mentor"
            });
        } else {
            return res.status(200).send({
                success: true,
                info: result
            })
        }
    })
}

exports.allMentors = allMentors;
exports.allReq = allReq;
exports.mentorById = mentorById;