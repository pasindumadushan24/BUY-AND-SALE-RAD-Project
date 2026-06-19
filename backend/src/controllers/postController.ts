import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (
  req: Request,
  res: Response
) => {
  try {
  console.log("USER => ", (req as any).user);


    const files = (req.files as Express.Multer.File[]) || [];

    const images = files.map(
      (file) =>
        `http://localhost:5000/uploads/${file.filename}`
    );



    const post = await Post.create({
       userId: (req as any).user.id,

      category: req.body.category,
      subCategory: req.body.subCategory,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
  
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







export const getMyPosts = async (
  req: any,
  res: Response
) => {
  try {
    const posts = await Post.find({
      userId: req.user.id,
    });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: "Error",
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