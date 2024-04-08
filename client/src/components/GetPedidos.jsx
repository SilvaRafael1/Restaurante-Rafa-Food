import { useState, useEffect } from "react"
import client from "../api/Api"

const GetPedidos = () => {
  const [pedidos, setPedidos] = useState([])

  const listPedidos = async () => {
    try {
      const res = await client.get("/pedidos")
      if (res.data) {
        setPedidos(res.data)
      } else {
        setPedidos([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listPedidos()
  }, [])

  return (
    <div className="flex justify-center flex-col items-center">
      {pedidos.map(pedido => (
        <div key={pedido._id} className="border border-solid border-gray-600 w-[1366px] mt-2 p-5 rounded-md">
          <p><b>Código do Pedido:</b> {pedido._id}</p>
          <p><b>Endereço: </b>{pedido.endereco}</p>
          <p><b>Produtos Selecionados:</b></p>
          <div>{pedido.produtos.map(produto => (
            <div key={Math.random()} className="p-3 m-1 border border-solid border-gray-300 rounded-sm flex">
              <div className="p-1">
                <p><b>{produto.name}</b></p>
                <p>{produto.description}</p>
                <p><b>Preço: </b>{produto.price}</p>
              </div>
              <div className="border-l border-solid p-2">
                <img src={produto.image} alt={produto.name} className="max-h-[150px] max-w-[150px]" />
              </div>
            </div>
          ))}</div>
          <p><b>Status do Pedido: </b>{pedido.status}</p>
        </div>
      ))}
    </div>
  )
}

export default GetPedidos