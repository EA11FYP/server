Placement = require('../models/placement');
Mentee = require('../models/mentee');

const newPlacement = async(req, res, next) => {
    let { title, body, authorId, domain, authorName, userType, type, ctc, location } = req.body;

    if(userType==='mentor'){
        return res.status(401).send({
            success:false,
            message:"Cannot create openings for this usertype"
        })
    }

    let today = new Date();
    let date = `${today.getDate()}:${today.getMonth()+1}:${today.getFullYear()}`;

    let placementOpening = new Placement({
        title: title,
        body: body,
        domain:domain,
        author:{
                id:authorId,
                username: authorName
        },
        date:date,
        type,
        ctc,
        location
    });

    await placementOpening.save();

    if(userType === "mentee"){
        Mentee.findById(authorId,  async (err, result) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Invalid user"
                });
            } else{
                result.jobOpenings.push(placementOpening._id);
                await result.save();
                res.send({
                    success: true,
                    message: "Job Opening sucessfully created",
                    userInfo: result,
                    postInfo: placementOpening
                });
            }
        });
    }
}

const allPlacements = async (req,res,next) => {
    Placement.find({}, (err, result) => {
        if(err){
           return  res.status(400).send({
                success: false,
                message: "Unexpected error"
            });
        } else {
            res.send({
                success: true,
                message: "Sucessfully send all openings",
                info: result.reverse()
            });
        }
    })
}

const placementById = async(req,res,next) => {
    const { id } = req.params;
    Placement.findOne({_id:id},((err, placement) => {
        if(err || !placement){
            return res.send({
                success: false,
                message: "Cannot find opening"
            });
        } else{
            return res.send(placement);
        }
    }))
}

const deletePlacement = async(req,res,next) => {
    Placement.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            return res.status(500).send({
                success: false,
                message: "Cannot delete post, error occured"
            });
        } else {
            res.send({
                success: true,
                message: "Sucessfully deleted post"
            });
        }
    });
}

const editPlacement = async (req,res,next) => {
    Placement.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if(err){
            return res.status(500).send({
                success: false,
                message: "Cannot edit post, error occured"
            });
        } else{
            res.send({
                success: true,
                message: "Sucessfully edited post",
                postInfo: result
            });
        }
    });
}

exports.newPlacement = newPlacement;
exports.allPlacements = allPlacements;
exports.placementById = placementById;
exports.deletePlacement = deletePlacement;
exports.editPlacement = editPlacement;