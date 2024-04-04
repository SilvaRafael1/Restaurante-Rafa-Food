import PedidoModel from "../models/PedidoModel.js"

export default {
  async index(req, res) {
    const pedidos = (await PedidoModel.find().populate({ path: "produtos" })).reverse();
    res.json(pedidos);
  },

  async findOne(req, res) {
    const pedido = await PedidoModel.findById(req.params.id)
    res.json(pedido)
  },

  async nextStatus(req, res) {
    const pedido = await PedidoModel.findById(req.params.id)
    switch(pedido.status) {
      case "Em preparo":
        pedido.status = "Em rota de entrega"
        res.json("Status avançado para rota de entrega")
        pedido.save()
        break;
      case "Em rota de entrega":
        pedido.status = "Entregue"
        res.json("Status avançado para entregue")
        pedido.save()
        break;
      case "Entregue":
        res.json("Pedido já foi entregue")
        break;
    }
  },

  async cancel(req, res) {
    const pedido = await PedidoModel.findById(req.params.id)
    pedido.status = "Pedido Cancelado"
    res.json("Pedido Cancelado")
    pedido.save()
  },

  async create(req, res) {
    const { produtos } = req.body;
    const pedido = await PedidoModel.create(req.body);
    res.json(pedido)
  }
}