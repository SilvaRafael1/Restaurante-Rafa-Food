import app from "./app.js"
import connectDB from "./db/connect.js"
import 'dotenv/config'

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        const mongoURI = process.env.MONGO_URI

        if(!mongoURI) {
            throw new Error("Mongo URI não definido.")
        }

        await connectDB(mongoURI)
        app.listen(port, () => console.log(`Server está rodando na porta ${port}`))
    } catch (err) {
        console.error(err)
    }
}

start()