import express from "express";
import { createPost, getFeed, getFeedHot, likePost } from "../controllers/posts";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get('/', verifyToken, getFeed)
router.get('/hot', verifyToken, getFeedHot)
router.post('/create', verifyToken, createPost)
router.patch('/:id/like', verifyToken, likePost)

export default router;
