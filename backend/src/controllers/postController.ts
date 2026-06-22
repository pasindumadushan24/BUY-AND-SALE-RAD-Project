import { Request, Response } from "express";
import Post from "../models/Post";

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];

    const images = files.map(
      (file) => `http://localhost:5000/uploads/${file.filename}`
    );

    const postData: any = {
      userId: (req as any).user.id,
      category: req.body.category,
      subCategory: req.body.subCategory,
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price),
      city: req.body.city,
      images,
    };

    // property only fields
    if (req.body.category === "Property") {
      postData.phoneNumber = req.body.phoneNumber
        ? req.body.phoneNumber
        : null;

      postData.address = req.body.address || null;

      postData.bedrooms = req.body.bedrooms
        ? Number(req.body.bedrooms)
        : null;

      postData.bathrooms = req.body.bathrooms
        ? Number(req.body.bathrooms)
        : null;
    }

    const post = await Post.create(postData);

    return res.status(201).json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return res.status(500).json({
      message: "Failed to create post",
    });
  }
};

// GET MY POSTS
export const getMyPosts = async (req: any, res: Response) => {
  try {
    const posts = await Post.find({ userId: req.user.id });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};






//delete post
export const deletePost = async (req: any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Delete failed",
    });
  }
};




// GET ALL POSTS
export const getPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load posts",
    });
  }
};