

import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { downloadInvoice, fetchAllProducts } from '../controllers/products.controller.js'

const routes = express.Router()


routes.route("/fetchProducts").get(fetchAllProducts)
routes.route("/download-invoice").post(verifyJWT,downloadInvoice)







export default routes