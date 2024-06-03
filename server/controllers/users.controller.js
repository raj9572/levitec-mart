
import User from '../models/User.js'
import bcryptjs from 'bcryptjs'
import { ErrorResponse, SucessResponse } from '../Utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

const registerUser = async(req,res) =>{
   try {
   
    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json(ErrorResponse(400, "All fields are required"))
    }

    const existedUser = await User.findOne({email})

    if (existedUser) {
        return res.status(409).json(ErrorResponse(409, "user already exist"))

    }

    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password,salt)


     await User.create({
        name, email, password:hashPassword
     })

     return res.json(SucessResponse(201,"","user is successfully created"))

    
   } catch (error) {
     
     return res.json(ErrorResponse(500, error.message || "interner server error"))
   }
}



const loginUser = async (req,res) =>{
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400)
                .json(ErrorResponse(400, "email or password is required"))
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json(ErrorResponse(400, " user doesnot Found"))
        }

        const isPasswordMatch = await bcryptjs.compare(password,user.password)

        if (!isPasswordMatch) {
            return res.status(404).json(ErrorResponse(400, " invalid user credential"))
        }

        const token = jwt.sign({
            _id:user._id,
            email:user.email
        },
        process.env.ACCESS_TOKEN_SECRET
    )

        return res.status(200)
            .json(SucessResponse(
                200,
                token,
                "user is login successfully"
            ))



    } catch (error) {
        
        return res.status(500)
            .json(ErrorResponse(500, error.message || "interner server error"))
    }
}




const getUserProfile = async(req,res) =>{
    try {
    
    return res.status(200).json(SucessResponse(200,req.user,""))
        
    } catch (error) {
        return res.status(500)
        .json(ErrorResponse(500, error.message || "interner server error"))
}
    
}


export {registerUser,loginUser,getUserProfile}