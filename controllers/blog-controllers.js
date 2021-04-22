const Blog = require('../models/blog');
// const Mentee = require('../models/mentee');
const Mentor = require('../models/mentor');

// const HttpError = require('../models/http-error');

const newBlog = async(req, res, next) => {
    let { title, body, authorId, domain, authorName, userType } = req.body;

    if(userType==='mentee'){
        return res.status(401).send({
            success:false,
            message:"Cannot create blog for this usertype"
        })
    }

    let today = new Date();
    let date = `${today.getDate()}:${today.getMonth()+1}:${today.getFullYear()}`;

    let blogPost = new Blog({
        title: title,
        body: body,
        domain:domain,
        author:{
                id:authorId,
                username: authorName
        },
        date:date
    });

    await blogPost.save();

    if(userType === "mentor"){
        Mentor.findById(authorId,  async (err, result) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Invalid user"
                });
            } else{
                result.blogs.push(blogPost._id);
                await result.save();
                res.send({
                    success: true,
                    message: "Blog sucessfully created",
                    userInfo: result,
                    postInfo: blogPost
                });
            }
        });
    }
}

const allBlogs = async (req,res,next) => {
    Blog.find({}, (err, result) => {
        if(err){
           return  res.status(400).send({
                success: false,
                message: "Unexpected error"
            });
        } else {
            res.send({
                success: true,
                message: "Sucessfully send all blogs",
                info: result.reverse()
            });
        }
    })
}

const blogById = async(req,res,next) => {
    const { id } = req.params;
    Blog.findOne({_id:id},((err, blog) => {
        if(err || !blog){
            return res.send({
                success: false,
                message: "Cannot find blog"
            });
        } else{
            return res.send(blog);
        }
    }))
}

const deleteBlog = async(req,res,next) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
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

const editBlog = async (req,res,next) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
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

exports.newBlog = newBlog;
exports.allBlogs = allBlogs;
exports.blogById = blogById;
exports.deleteBlog = deleteBlog;
exports.editBlog = editBlog;