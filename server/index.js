import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/index.js'
const app = express()
const port = process.env.PORT || 4000
dotenv.config();

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))


app.use(express.json())





app.get('/', (req, res) => {
    res.send('Hello World!')
})


import userRoute from './routes/users.routes.js'
import productRoute from "./routes/products.routes.js"

app.use("/users", userRoute)
app.use("/products", productRoute)






connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("server Error", error)

        })
        app.listen(port, () => {
            console.log(`server is listning on port ${port}`)
        })
    })
    .catch((err) => {
        console.log('MONGODB Connection FAILED:', err)
    })