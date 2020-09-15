const express = require('express');
const requireLogin = require('../middlewares/reqLogin');

const forumControllers = require('../controllers/forum-controllers');

const router = express.Router();

router.post("/new", forumControllers.newForumPost);

router.get("/",forumControllers.allForumPost);

router.delete("/delete/:id", forumControllers.deleteForumPost);

module.exports = router;