const express = require('express');

const forumControllers = require('../controllers/forum-controllers');

const router = express.Router();

router.post("/new",forumControllers.newForumPost);

module.exports = router;