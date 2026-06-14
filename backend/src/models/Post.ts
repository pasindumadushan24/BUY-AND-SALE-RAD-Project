import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);