import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
  endereco: {
    type: String,
    required: [true, "Forneça um endereço"]
  },
  status: {
    type: String,
    default: "Em preparo",
  },
  date: {
    type: Date,
    default: Date.now
  },
  produtos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: [true, "Necessário informar o(s) produto(s)"]
    },
  ],
})

export default mongoose.model("Pedido", PedidoSchema);