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

exports.allReq = allReq;