import express from "express"
import ProdutoController from "../controller/ProdutoController.js"
import PedidoController from "../controller/PedidoController.js"
import AuthController from "../controller/AuthController.js"
import EnderecoController from "../controller/EnderecoController.js"

const router = express.Router()

// Produtos
router.get("/produtos", ProdutoController.index)
router.get("/produtos/random", ProdutoController.random)
router.get("/produtos/:id", ProdutoController.findOne)
router.post("/produtos", ProdutoController.create)
router.put("/produtos/:id", ProdutoController.update)
router.delete("/produtos/:id", ProdutoController.delete)

// Pedidos
router.get("/pedidos", PedidoController.index)
router.get("/pedidos/:id", PedidoController.findOne)
router.get("/pedidos/nextStatus/:id", PedidoController.nextStatus)
router.get("/pedidos/cancel/:id", PedidoController.cancel)
router.post("/pedidos", PedidoController.create)

// Auth
router.get("/login", AuthController.users)
router.post("/login", AuthController.login)
router.post("/register", AuthController.create)

// Enderecos
router.get("/enderecos", EnderecoController.index)
router.post("/enderecos", EnderecoController.indexById)
router.post("/enderecos/new", EnderecoController.create)
router.delete("/enderecos/:id", EnderecoController.delete)

export default router;