const Mentee = require('../models/mentee');

const allReq = async(req,res,next) => {
    Mentee.findById(req.params.id, (err, result) => {
        if(err){
            return  res.status(400).send({
                 success: false,
                 message: "Cannot find mentee"
            });
        } else {
            return res.status(200).send({
                success: true,
                info: result.requests
            })
        }
    }).populate('requests');
}

const menteeById = async( req, res, next ) => {
    Mentee.findOne({_id:req.params.id},((err, result) => {
        if (err) {
            return res.status(404).send({
                success: false,
                message: "Cannot find mentee"
            });
        } else {
            return res.status(200).send({
                success: true,
                info: result
            })
        }
    })).populate('mentors');
}

exports.allReq = allReq;
exports.menteeById = menteeById;