import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    ],
    Address: {
        type: String,
        required: true,
    },
    Payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },
    Status: {
        type: String,
        required: true,
        default: "Pending"
    },
    TotalPrice: {
        type: Number,
        required: true
    }
})

export const Order = mongoose.model("Order", OrderSchema)
