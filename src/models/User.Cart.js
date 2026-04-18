import mongoose, {Schema} from "mongoose";

const CartItemSchema = new Schema({
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        default: 1
    },
}, {
    _id: false
});

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [CartItemSchema],

    TotalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export const Cart = mongoose.model("Cart", CartSchema)