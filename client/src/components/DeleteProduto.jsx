import React from 'react'
import client from '../api/Api'
import { useParams } from 'react-router-dom'

const DeleteProduto = () => {
    const { id } = useParams()
    
    const handleDelete = async () => {
        await client.delete("/produtos/" + id)
        alert(`Produto com o ID ${id} deletado com sucesso!`)
        window.location.href = "http://localhost:5173";
    }

  return (
    handleDelete()
  )
}

export default DeleteProduto