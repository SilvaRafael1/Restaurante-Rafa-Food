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


  console.log(pedidos)

  return (
    <div>
      {pedidos.map(pedido => (
        <div key={pedido._id}>
          <p>{pedido.endereco}</p>
          <p>{pedido.produtos.map(produto => (
            <div>
              <hr />
              <p>{produto.name}</p>
              <p>{produto.description}</p>
              <p>{produto.price}</p>
              <hr />
            </div>
          ))}</p>
          <p>{pedido.status}</p>
        </div>
      ))}
    </div>
  )
}

export default GetPedidos