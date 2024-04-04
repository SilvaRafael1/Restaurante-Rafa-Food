import { useEffect, useState } from "react";
import client from "../api/Api";

function GetOneProduto(id) {
    const [produto, setProduto] = useState([]);

    const produtoData = async () => {
        const res = await client.get(`/produtos/${id}`);
        if (res.data) {
            setProduto(res.data)
        } else {
            setProduto([])
        }
    }

    useEffect(() => {
        produtoData();
    }, [])

    return { produto }
}

export default GetOneProduto;