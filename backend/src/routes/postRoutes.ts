import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth";

import {
  createPost,
  getPosts,
    getMyPosts,
//delete
      deletePost,

} from "../controllers/postController";


const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//PROTECTED ROUTE
router.post(
  "/",
  auth,                 
  upload.array("images", 5),
  createPost
);

router.get("/", getPosts);

router.get(
  "/my-posts",
  auth,
  getMyPosts
);


//delete post 
router.delete("/:id", auth, deletePost);

export default router;