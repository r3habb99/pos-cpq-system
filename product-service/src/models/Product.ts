import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name Required"],
      minlength: 3,
      maxlength: 100,
      match: /^[A-Za-z\s]+$/,
    },
    price: {
      type: Number,
      required: [true, "Price required"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Category Required"],
      minlength: 3,
      maxlength: 50,
    },
    inStock: {
      type: Boolean,
      required: [true, "In-stock Required"],
    },
    description: {
      type: String,
      maxlength: 500,
    },
    imageURL: {
      type: String,
      required: [false, "Image URL is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
      default: null, // NULL when not deleted
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
