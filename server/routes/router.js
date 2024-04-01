import express from "express"
import ProdutoController from "../controller/ProdutoController.js"

const router = express.Router()

// Produtos
router.get("/produtos", ProdutoController.index)
router.get("/produto/random", ProdutoController.random)
router.get("/produtos/:id", ProdutoController.findOne)
router.post("/produtos", ProdutoController.create)
router.delete("/produtos/:id", ProdutoController.delete)

export default router;