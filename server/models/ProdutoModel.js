import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor informe um nome"]
    },
    description: {
        type: String,
        required: [true, "Por favor informe uma descrição"]
    },
    price: {
        type: String,
        required: [true, "Por favor informe um preço"]
    },
    image: {
        type: String,
        required: [true, "Por favor informe uma URL de imagem"]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Produto", ProdutoSchema)