import express from "express"
import cors from "cors"

const app = express();

// Security
app.use(cors())

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app