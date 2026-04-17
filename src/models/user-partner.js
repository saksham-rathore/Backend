import mongoose, {Schema} from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        Password: {
            type: String,
            required: true,
        }
        refreshToken: {
            type: String,
        }
    },{
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    if(this.isModified("Password")) return;
    this.Password = await bcrypt.hash(this.Password, 10)
})


userSchema.methods.isPasswordCorrect = async function () {
    return await bcrypt.compare(Password, this.Password)
}
