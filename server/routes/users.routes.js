import express from 'express'
import { getUserProfile, loginUser, registerUser } from '../controllers/users.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const routes = express.Router()


routes.route("/signup").post(registerUser)
routes.route("/login").post(loginUser)
routes.route("/profile").get(verifyJWT,getUserProfile)






export default routes