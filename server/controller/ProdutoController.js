import ProdutoModel from "../models/ProdutoModel.js";

export default {
    async index(req, res) {
        const produtos = await ProdutoModel.find();
        res.json(produtos)
    },

    async findOne(req, res) {
        const produto = await ProdutoModel.findById(req.params.id);
        if (!produto) {
            res.send("Produto não encontrado")
        }
        res.json(produto)
    },

    async create(req, res) {
        const produto = await ProdutoModel.create(req.body)
        res.json(produto)
    },

    async update(req, res) {
        const updateProduto = await ProdutoModel.findByIdAndUpdate(req.params.id, req.body)
        updateProduto.save()
        res.json(updateProduto)
    },

    async delete(req, res) {
        const produto = await ProdutoModel.findById(req.params.id);
        if (!produto) {
            res.send("Produto não encontrado")
        }
        await ProdutoModel.deleteOne(produto)
        res.send("Produto excluído")
    },

    async random(req, res) {
        const produto = await ProdutoModel.aggregate([{ $sample: {size: 1 }}])
        res.json(produto)
    }
}