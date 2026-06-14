import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (
  req: Request,
  res: Response
) => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];

    const images = files.map(
      (file) =>
        `http://localhost:5000/uploads/${file.filename}`
    );

    const post = await Post.create({
      category: req.body.category,
      subCategory: req.body.subCategory,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      images,
    });

    res.status(201).json(post);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create post",
      error,
    });
  }
};

export const getPosts = async (
  req: Request,
  res: Response
) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: "Failed to load posts",
    });
  }
};