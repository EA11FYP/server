const Forum = require('../models/forum/forum');
const Comment = require('../models/forum/comments');
const Mentee = require('../models/mentee');
const Mentor = require('../models/mentor');

const HttpError = require('../models/http-error');

const newForumPost = async (req, res, next) => {
    let { title, description, domain, authorId, authorName, userType } = req.body;

    // let forumThread = {
    //     title:title,
    //     description:description, 
    //     domain:domain,
    //     author:{
    //         id:authorId,
    //         username: authorName
    //     }
    // };

    let newPost =  new Forum({title:title,
                        description:description, 
                        domain:domain,
                        author:{
                                id:authorId,
                                username: authorName
                        }});
    await newPost.save();
    res.send({
        success: true,
        message: "Forum post sucessfully created",
        info: newPost
    });
    
};

exports.newForumPost = newForumPost;
