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
        },
        refreshToken: {
            type: String,
        },
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

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            email: this.email,
            Password: this.Password
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)