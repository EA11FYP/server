const express = require('express');

const router = express.Router();

const blogControllers = require('../controllers/blog-controllers');

router.get('/',blogControllers.allBlogs);

router.post('/new',blogControllers.newBlog);

router.get('/one/:id',blogControllers.blogById);

router.delete('/delete/:id');

router.post('edit/:id');

module.exports = router;