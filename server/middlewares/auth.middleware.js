import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ErrorResponse } from "../Utils/ApiResponse.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json(ErrorResponse(401, "Unauthorized request"))
        }


        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
           return res.json(ErrorResponse(401,"Invalid Access Token"))
        }


        req.user = user

        next()
    } catch (error) {
        return res.status(ErrorResponse(401,error?.message || "Invalid Access Token"))
    }

}


