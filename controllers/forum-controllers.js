const Forum = require('../models/forum/forum');
const Comment = require('../models/forum/comments');
const Mentee = require('../models/mentee');
const Mentor = require('../models/mentor');


const HttpError = require('../models/http-error');

const newForumPost = async (req, res, next) => {
    let { title, description, domain, authorId, authorName, userType } = req.body;

    let newPost =  new Forum({title:title,
                        description:description, 
                        domain:domain,
                        author:{
                                id:authorId,
                                username: authorName
                        }});
    await newPost.save();

    if(userType === "mentor"){
        Mentor.findById(authorId,  async (err, result) => {
            if(err){
                res.send({
                    success: false,
                    message: "Invalid user"
                });
                return new HttpError('User invalid', 401);
            } else{
                result.forumPost.push(newPost._id);
                await result.save();
                res.send({
                    success: true,
                    message: "Forum post sucessfully created",
                    userInfo: result,
                    postInfo: newPost
                });
            }
        });
    } else if(userType === "mentee"){
        Mentee.findById(authorId,  async (err, result) => {
            if(err){
                res.send({
                    success: false,
                    message: "Invalid user"
                });
                return new HttpError('User invalid', 401);
            } else{
                result.forumPost.push(newPost._id);
                await result.save();
                res.send({
                    success: true,
                    message: "Forum post sucessfully created",
                    userInfo: result,
                    postInfo: newPost
                });
            }
        });
    }
};

const allForumPost = (req, res, next) => {
    Forum.find({}, (err, result) => {
        if(err){
            res.send({
                success: false,
                message: "Unexpected error"
            });
            return new HttpError('Error', 404);
        } else {
            res.send({
                success: true,
                message: "Sucessfully send all posts",
                info: result
            });
        }
    })
};

const deleteForumPost = (req, res, next) => {
    Forum.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.send({
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

const editFourmPost = (req, res, next) => {
    Forum.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if(err){
            return res.send({
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



exports.newForumPost = newForumPost;
exports.allForumPost = allForumPost;
exports.deleteForumPost = deleteForumPost;
exports.editFourmPost = editFourmPost;
