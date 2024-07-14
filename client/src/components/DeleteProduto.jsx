import { useNavigate } from "react-router-dom";
import client from "../api/Api";
import { Button } from "@mui/material";

function DeleteProduto({ id }) {
    const navigate = useNavigate();
    
    const handleDelete = async () => {
        try {
            await client.delete(`/produtos/${id}`)
            console.log(`Produto com o ID ${id} deletado com sucesso!`)
            alert(`Produto com o ID ${id} deletado com sucesso!`)
            navigate("/");
        } catch (err) {
            console.error('Erro ao deletar produto: ', err)
        }
    }

    return (
      <Button size="small" color="primary" onClick={handleDelete}>Deletar</Button>
    )
}

export default DeleteProduto;