const express = require('express');

const forumControllers = require('../controllers/forum-controllers');

const router = express.Router();

router.post("/new",forumControllers.newForumPost);

router.get("/",forumControllers.allForumPost);

module.exports = router;