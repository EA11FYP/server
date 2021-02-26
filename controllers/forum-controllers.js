const Forum = require('../models/forum/forum');
const Comment = require('../models/forum/comments');
const Mentee = require('../models/mentee');
const Mentor = require('../models/mentor');


const HttpError = require('../models/http-error');

const newForumPost = async (req, res, next) => {
    let { title, description, domain, authorId, authorName, userType } = req.body;

    let newPost =  new Forum({
        title:title,
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

const getForumById = (req, res, next) => {
    const { id } = req.params;
    Forum.findOne({_id:id},((err, forum) => {
        if(err || !forum){
            return res.send({
                success: false,
                message: "Cannot find post"
            });
        } else{
            return res.send(forum);
        }
    })).populate("comments")
};

const allForumPost = (req, res, next) => {
    Forum.find({}, (err, result) => {
        if(err){
           return  res.status(400).send({
                success: false,
                message: "Unexpected error"
            });
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

const editFourmPost = (req, res, next) => {
    Forum.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
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

const newForumComment = (req, res, next) => {
    Forum.findOne({_id:req.params.id}, async (err, forum) => {
        if(err || !forum){
            return res.send({
                success: false,
                message: "Cannot find post"
            });
        } else{
            let { body, authorId, authorName, userType } = req.body;
            //return res.send({forum});
            let today = new Date();
            let date = `${today.getDate()}:${today.getMonth()}:${today.getFullYear()}`;

            if(!body || !authorId || !authorName || !userType){
                return res.status(401).send({
                    success: false,
                    message: "invalid inputs"
                });
            }

            let newComment = new Comment({
                body: body,
                author: {
                    id: authorId,
                    username: authorName
                },
                date: date
            });
            await newComment.save();
            //return res.send(newComment);
            forum.comments.push(newComment);
            await forum.save();

            if(userType === 'mentor'){
                Mentor.findById(authorId, async (err, mentor) => {
                    if(err){
                        return res.send({
                            success: false,
                            message: "Something went wrong"
                        });
                    } else{
                        mentor.comments.push(newComment);
                        await mentor.save();
                        return res.send({
                            success: true,
                            message: "Comment added sucessfully",
                            forumInfo: forum,
                            commentInfo: newComment,
                            userInfo: mentor
                        });
                    }
                });
            } else if(userType === 'mentee'){
                Mentee.findById(authorId, async (err, mentee) => {
                    if(err){
                        return res.send({
                            success: false,
                            message: "Something went wrong"
                        });
                    } else{
                        mentee.comments.push(newComment);
                        await mentee.save();
                        return res.send({
                            success: true,
                            message: "Comment added sucessfully",
                            forumInfo: forum,
                            commentInfo: newComment,
                            userInfo: mentee
                        });
                    }
                });
            }  else {
                res.status(500).send({
                    success: false,
                    message: "cannot post comment"
                })
            }
        }
    })
}

exports.newForumPost = newForumPost;
exports.getForumById = getForumById;
exports.allForumPost = allForumPost;
exports.deleteForumPost = deleteForumPost;
exports.editFourmPost = editFourmPost;
exports.newForumComment = newForumComment;