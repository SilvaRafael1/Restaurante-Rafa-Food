import { useEffect, useState } from "react"
import client from "../api/Api"

const GetRandom = () => {
  // const [produto, setProduto] = useState([])

  // const listPedido = async () => {
  //   try {
  //     const res = await client.get("/pedidos/random")
  //     if (res.data) {
  //       setProduto(res.data)
  //     } else {
  //       setProduto([])
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   listPedido()
  // }, [])

  return (
    // <div className="flex justify-center">
    //   {produto.map(produto => (
    //     <div key={produto._id} className="border border-solid border-gray-600 w-[1366px] mt-2 p-5 rounded-md">
    //       <p>{produto.name}</p>
    //     </div>
    //   ))}
    // </div>
    <div>Random Produto</div>
  )
}

export default GetRandom