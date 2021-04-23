let Requests = require('../models/request');
let Mentor = require('../models/mentor');
let Mentee = require('../models/mentee');

let newRequest = async (req, res, next) => {
    let { mentorId, menteeId, mentorName, menteeName } = req.body;

    if(!menteeId || !menteeName || !mentorId || !mentorName){
        return res.status(400).send({
            success:false,
            message: "Invalid inputs"
        });
    }

    let today = new Date();
    let date = `${today.getDate()}:${today.getMonth()+1}:${today.getFullYear()}`;

    let newReq = new Requests({
        from:menteeId,
        to:mentorId,
        status: "HOLD",
        mentorName,
        menteeName,
        date
    });

    try{
        await newReq.save();
    } catch(err){
        res.status(400).send({
            success: false,
            message: "Error occured while requesting"
        })
    }

    await Mentor.findById(mentorId, async(err, result) => {
        if(err || !result){
            return res.send({
                success: false,
                message: "Cannot find Mentor"
            });
        } else {
            result.requests.push(newReq);
            await result.save();
        }
    });

    await Mentee.findById(menteeId, async (err, result) =>{
        if(err || !result){
            return res.send({
                success: false,
                message: "Cannot find Mentee"
            });
        } else {
            result.requests.push(newReq);
            await result.save();
        }
    });

    return res.status(200).send({
        success: true,
        message: "Request created",
        result: newReq
    });
}

let allreq = async(req, res, next) => {
    Requests.find({}, (err,result) => {
        res.send(result);
    })
}

let allMentee = async(req, res, next) => {
    Mentee.find({}, (err,result) => {
        res.send(result);
    })
}

exports.newRequest = newRequest;
exports.allreq = allreq;
exports.allMentee = allMentee;