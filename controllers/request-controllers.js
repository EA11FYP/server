let Requests = require('../models/request');
let Mentor = require('../models/mentor');
let Mentee = require('../models/mentee');

let newRequest = async (req, res, next) => {
    let { mentorId, menteeId, mentorName, menteeName, requestMessage } = req.body;

    if(!menteeId || !menteeName || !mentorId || !mentorName || !requestMessage){
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
        date,
        requestMessage
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

let requestAction = async (req, res, next) => {
    let { mentorId, menteeId, status, requestId } = req.body;

    if( !menteeId || !mentorId || !status || !requestId ){
        return res.status(400).send({
            success:false,
            message: "Invalid inputs"
        });
    }

    // if(status != 'ACCEPT' || status != 'DECLINE'){
    //     return res.status(400).send({
    //         success: false,
    //         message: "status value incorrect"
    //     })
    // }

    if(status === 'ACCEPT'){
        await Requests.findById(requestId, async (err,result) => {
            if(err || !result){
                    return res.status(400).send({
                        success: false,
                        message: "Cannot find Request"
                });
            } else{
                result.status = status;
                await result.save();
            }
        });

        await Mentor.findById(mentorId, async  (err,result) => {
            if(err || !result){
                return res.status(400).send({
                    success: false,
                    message: "Cannot find Mentor"
                });
            } else {
                result.mentees.push(menteeId);
                await result.save();
            }
        });

        await Mentee.findById(menteeId, async (err,result) => {
            if(err || !result){
                return res.status(400).send({
                    success: false,
                    message: "Cannot find Mentee"
                });
            } else {
                result.mentors.push(mentorId);
                await result.save();
            }
        });
    } else if(status === 'DECLINE'){
        await Requests.findById(requestId, async (err,result) => {
            if(err || !result){
                    return res.status(400).send({
                        success: false,
                        message: "Cannot find Request"
                });
            } else{
                result.status = status;
                await result.save();
            }
        });
    }

    return res.status(200).send({
        success: true,
        message: "Action completed"
    })
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
exports.requestAction = requestAction;