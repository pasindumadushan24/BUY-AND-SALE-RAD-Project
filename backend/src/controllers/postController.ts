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




    // vehicle only fields
if (req.body.category === "Vehicles") {
  postData.phoneNumber = req.body.phoneNumber || null;

  postData.year = req.body.year
    ? Number(req.body.year)
    : null;

  postData.mileage = req.body.mileage || null;

  postData.model = req.body.model || null;

  postData.gear = req.body.gear || null;

  postData.fuelType = req.body.fuelType || null;

  postData.engineCC = req.body.engineCC
    ? Number(req.body.engineCC)
    : null;
}

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



export const updatePost = async (req: any, res: Response) => {
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

    //update post

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: Number(req.body.price),
        city: req.body.city,
        

        phoneNumber: req.body.phoneNumber,
        model: req.body.model,
        year: Number(req.body.year),
        gear: req.body.gear,
        fuelType: req.body.fuelType,
        mileage: Number(req.body.mileage),
        engineCC: Number(req.body.engineCC),

        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
      },
      { new: true }
    );

    return res.json(updatedPost);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Update failed",
    });
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