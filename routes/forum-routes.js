const express = require('express');
const requireLogin = require('../middlewares/reqLogin');

const forumControllers = require('../controllers/forum-controllers');

const router = express.Router();

router.post("/new", requireLogin, forumControllers.newForumPost);

router.get("/",forumControllers.allForumPost);

router.get("/one/:id", forumControllers.getForumById);

router.delete("/delete/:id", requireLogin, forumControllers.deleteForumPost);

router.put("/edit/:id", requireLogin, forumControllers.editFourmPost);

router.post("/:id/comment/new", requireLogin, forumControllers.newForumComment);

module.exports = router;