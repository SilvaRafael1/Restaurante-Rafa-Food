import Endereco from "../models/endereco.js"

export default {
  async index(req, res) {
    try {
      const enderecos = await Endereco.findAll();
      return res.json(enderecos)
    } catch(e) {
      console.error(e)
    }
  },

  async indexById(req, res) {
    try {
      const { userId } = req.body
      const enderecos = await Endereco.findAll({
        where: {
          userId
        }
      })

      res.json(enderecos)
    } catch (error) {
      console.error(error);
    }
  },

  async create(req, res) {
    try {
      const endereco = await Endereco.create(req.body)
      res.json(endereco)
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params

    try {
      await Endereco.destroy({
        where: {
          id
        }
      })
      res.send("Endereço excluído")
    } catch (error) {
      console.error(error);
    }
  }
}