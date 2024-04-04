import { useEffect, useState } from "react"
import client from "../api/Api"

const GetRandom = () => {
  const [produto, setProduto] = useState([])

  const listPedido = async () => {
    try {
      const res = await client.get("/produtos/random")
      if (res.data) {
        setProduto(res.data)
      } else {
        setProduto([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listPedido()
  }, [])

  return (
    <div className="flex justify-center">
      {produto.map(produto => (
        <div key={produto._id} className="border border-solid border-gray-600 w-[1366px] mt-2 p-5 rounded-md flex flex-row">
          <div className="w-[683px] border-r border-solid p-6 flex items-center justify-center">
            <img src={produto.image} alt={produto.name} className="h-[500px]" />
          </div>
          <div className="w-[683px] p-6">
            <p className="text-bold text-4xl">{produto.name}</p>
            <p className="my-2">{produto.description}</p>
            <p><b>Preço: </b>R${produto.price}</p>
          </div>
        </div>
      ))}
    </div>
    // <div>Random Produto</div>
  )
}

export default GetRandom