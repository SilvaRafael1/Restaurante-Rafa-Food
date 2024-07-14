import { useNavigate } from "react-router-dom";
import client from "../api/Api";
import { Button } from "@mui/material";

function DeleteEndereco({ id }) {
  const navigate = useNavigate();
    
    const handleDelete = async () => {
        try {
            await client.delete(`/enderecos/${id}`)
            console.log(`Endereço com o ID ${id} deletado com sucesso!`)
            alert(`Endereço com o ID ${id} deletado com sucesso!`)
            navigate("/");
        } catch (err) {
            console.error('Erro ao deletar endereço: ', err)
        }
    }

    return (
      <Button size="small" color="primary" onClick={handleDelete}>Deletar</Button>
    )
}

export default DeleteEndereco;