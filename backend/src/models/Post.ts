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
}


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