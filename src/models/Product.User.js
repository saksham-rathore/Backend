import mongoose, {Schema} from "mongoose";

const ProductSchema = new Schema({
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

export const Product = mongoose.model("Product", ProductSchema)