import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js"
import Endereco from "../models/endereco.js"

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
        return res.send("Conta já cadastrada, favor realizar login!")
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
      return res.send("Conta não encontrada, favor realizar cadastro!")
    } 

    const booleanPassword = await bcrypt.compare(password, findUser.dataValues.password)

    if(booleanPassword) {
      const accessToken = jwt.sign({ email: findUser.dataValues.email }, accessTokenSecret, { expiresIn: '2m' })
      const user = { 
        id: findUser.dataValues.id,
        name: findUser.dataValues.name, 
        email: findUser.dataValues.email, 
        role: findUser.dataValues.role 
      }

      const enderecos = await Endereco.findAll({
        where: {
          userId: findUser.dataValues.id
        }
      })

      return res.json({
        accessToken, user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          enderecos
        }
      })
    } else {
      return res.send("Senha incorreta")
    }
  }

}