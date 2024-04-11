// import client from '../api/Api'
// import { useParams } from 'react-router-dom'

// const DeleteProduto = () => {
//     const { id } = useParams()
    
//     const handleDelete = async () => {
//       try {
//         await client.delete(`/produtos/${id}`)
//         console.log(`Livro com o ID ${id} deletado com sucesso!`)
//         alert(`Livro com o ID ${id} deletado com sucesso!`)
//         window.location.href = "http://127.0.0.1:5173";
//       } catch (err) {
//           console.error('Erro ao deletar livro: ', err)
//       }
//     }

//   return (
//     handleDelete()
//   )
// }

// export default DeleteProduto

import client from "../api/Api";
import { Button } from "@mui/material";

function DeleteProduto({ id }) {
    
    const handleDelete = async () => {
        try {
            await client.delete(`/produtos/${id}`)
            console.log(`Livro com o ID ${id} deletado com sucesso!`)
            alert(`Livro com o ID ${id} deletado com sucesso!`)
            window.location.href = "http://localhost:5173";
        } catch (err) {
            console.error('Erro ao deletar livro: ', err)
        }
    }

    return (
      <Button size="small" color="primary" onClick={handleDelete}>Deletar</Button>
    )
}

export default DeleteProduto;