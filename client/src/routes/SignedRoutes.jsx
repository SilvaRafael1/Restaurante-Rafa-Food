import { Route, Routes } from "react-router-dom"

// Components
import GetProdutos from "../components/GetProdutos"
import CreateProduto from "../components/CreateProduto";
import UpdateProduto from "../components/UpdateProduto";
import DeleteProduto from "../components/DeleteProduto";
import GetPedidos from "../components/GetPedidos";
import GetRandom from "../components/GetRandom";
import CreatePedido from "../components/CreatePedido";

export default function SignedRoutes() {
  return (
    <Routes>
      <Route exact path="/" Component={GetProdutos} />
      <Route path="/createProduto" Component={CreateProduto} />
      <Route path="/updateProduto/:id" Component={UpdateProduto} />
      <Route path="/deleteProduto/:id" Component={DeleteProduto} />
      <Route path="/getPedidos" Component={GetPedidos} />
      <Route path="/produtos/random" Component={GetRandom} />
      <Route path="/createPedido" Component={CreatePedido} />
    </Routes>
  )
}