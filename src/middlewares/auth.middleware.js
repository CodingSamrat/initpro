


import jwt from "jsonwebtoken";
import { Tokens } from "../constants/index.js";
import { User } from "../models/user.model.js";
import { response } from "../libs/response.js";
import Mongoose from "mongoose";

const auth = async (req, res, next) => {
    // Access the Authentication Token from cookie or request header
    const token = await req.cookies[Tokens.AUTH_TOKEN] || req.header("Authorization")?.replace("Bearer ", "")


    // Check if there is any token or not
    if (!token) {
        return response(res, 401, { error: 'Unauthorized request! Login first to get access' })
    }


    try {
        // Decode Authentication Token
        const decodedData = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);


        // Find User using decoded User ID
        const user = await User.findById(new Mongoose.Types.ObjectId(decodedData._id)).select('-password')
        if (!user) {
            return response(res, 401, { error: 'Invalid Access Token!' })
        }

        req.user = user;
        next ? next() : ""


    } catch (err) {
        console.log(err);
        return response(res, 500, { error: 'Internal Server Error!!' })
    }
};

export default auth;