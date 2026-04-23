import mongoose, { Schema } from "mongoose";

export const ProductModel = new Schema({
    Product: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
})

export const Product = mongoose.model("Product", ProductModel)