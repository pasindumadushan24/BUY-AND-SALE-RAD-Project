"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.deletePost = exports.updatePost = exports.getMyPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
// CREATE POST
const createPost = async (req, res) => {
    try {
        const files = req.files || [];
        const images = files.map((file) => `https://gracious-liberation-production-245a.up.railway.app/uploads/${file.filename}`);
        const postData = {
            userId: req.user.id,
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
        const post = await Post_1.default.create(postData);
        return res.status(201).json(post);
    }
    catch (error) {
        console.error("CREATE POST ERROR:", error);
        return res.status(500).json({
            message: "Failed to create post",
        });
    }
};
exports.createPost = createPost;
// GET MY POSTS
const getMyPosts = async (req, res) => {
    try {
        const posts = await Post_1.default.find({ userId: req.user.id });
        return res.json(posts);
    }
    catch (error) {
        return res.status(500).json({ message: "Error" });
    }
};
exports.getMyPosts = getMyPosts;
const updatePost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
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
        const updatedPost = await Post_1.default.findByIdAndUpdate(req.params.id, {
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
        }, { new: true });
        return res.json(updatedPost);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Update failed",
        });
    }
};
exports.updatePost = updatePost;
//delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
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
        await Post_1.default.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Post deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Delete failed",
        });
    }
};
exports.deletePost = deletePost;
// GET ALL POSTS
const getPosts = async (_req, res) => {
    try {
        const posts = await Post_1.default.find().sort({ createdAt: -1 });
        return res.json(posts);
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to load posts",
        });
    }
};
exports.getPosts = getPosts;
