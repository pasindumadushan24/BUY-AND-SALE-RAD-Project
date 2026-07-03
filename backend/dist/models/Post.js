"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    city: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    phoneNumber: {
        type: String,
    },
    model: {
        type: String,
    },
    year: {
        type: Number,
    },
    gear: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    mileage: {
        type: Number,
    },
    engineCC: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Post", postSchema);
