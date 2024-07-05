import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js"

const accessTokenSecret = "restauranteRafael"

export default {
  async users(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async create(req, res) {
    try {
      const { name, email, password} = req.body
      const hashPassword = await bcrypt.hash(password, 2)

      const findUser = await User.findOne({
        where: {
          email: email
        }
      })
  
      if(findUser) {
        return res.status(400).send("Conta já cadastrada, favor realizar login!")
      } 
      
      const user = await User.create({
        name,
        email,
        password: hashPassword
      })
      
      return res.json({
        message: "Usuário criado com sucesso.",
        user: user
      })
    } catch (error) {
      return console.error(error)      
    }
  },

  async login(req, res) {
    const { email, password } = req.body
    const findUser = await User.findOne({
      where: {
        email: email
      }
    })

    if(!findUser) {
      return res.status(404).send("Conta não encontrada, favor realizar cadastro!")
    } 

    const booleanPassword = await bcrypt.compare(password, findUser.dataValues.password)

    if(booleanPassword) {
      const accessToken = jwt.sign({ email: findUser.dataValues.email }, accessTokenSecret, { expiresIn: '2m' })
      const user = { name: findUser.dataValues.name, email: findUser.dataValues.email }
      return res.json({
        accessToken, user
      })
    } else {
      return res.send("Senha incorreta")
    }
  }

}