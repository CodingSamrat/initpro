import Mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import {
    AUTH_TOKEN_EXPIRY,
    AUTH_TOKEN_SECRET
} from "../root.config.js";


const userSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
        },
    },
    {
        timestamps: true
    }
)



userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            isAdmin: this.isAdmin,
        },
        AUTH_TOKEN_SECRET,
        {
            expiresIn: AUTH_TOKEN_EXPIRY
        }
    )
}

export const User = Mongoose.model("User", userSchema)