const express = require('express');
const requireLogin = require('../middlewares/reqLogin');

const forumControllers = require('../controllers/forum-controllers');

const router = express.Router();

router.post("/new", forumControllers.newForumPost);

router.get("/",forumControllers.allForumPost);

router.get("/one/:id", forumControllers.getForumById);

router.delete("/delete/:id", forumControllers.deleteForumPost);

router.post("/edit/:id", forumControllers.editFourmPost);

router.post("/:id/comment/new", forumControllers.newForumComment);

module.exports = router;