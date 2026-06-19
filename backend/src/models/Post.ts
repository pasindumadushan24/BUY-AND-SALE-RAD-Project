import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    city: { type: String, required: true },

    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    images: { type: [String], default: [] },

    // ✅ ADD THESE
    bedrooms: {
      type: Number,
      default: null,
    },

    bathrooms: {
      type: Number,
      default: null,
    },

    phoneNumber: {
      type: String,
      default: null,
    },

    // address: {
    //   type: String,
    //   default: null,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);