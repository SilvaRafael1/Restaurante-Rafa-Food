import { Grid, Card, CardActionArea, CardContent, CardMedia, Button, Typography, CardActions, Fab, Box } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import client from "../api/Api";

const GetProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0)

  const addProduto = () => {
    let novaQuantidade = totalProdutos
    novaQuantidade++
    setTotalProdutos(novaQuantidade)
  }

  const listProdutos = async () => {
    try {
      const res = await client.get("/produtos")
      if (res.data) {
        setProdutos(res.data)
      } else {
        setProdutos([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listProdutos()
  }, [])

  return (
    <div style={{ marginTop: 20, padding: 30 }}>
      {/* {totalProdutos === 0 ? () => {<div>A</div>} : null} */}
      <div className="fixed bottom-8 right-12">
        <Fab color="primary" aria-label="Sacola">
          <ShoppingBag />
        </Fab>

        <Fab color="secondary" aria-label="Quantidade" size="small" style={{ position: "absolute", left: "35px", bottom: "25px" }}>
          {totalProdutos}
        </Fab>
      </div>

      <Grid container spacing={15} justify="center">
        {produtos.map(produto => (
          <Grid item key={produto._id}>
            <Card className="max-w-[360px]">
              <>
                <CardMedia component="img" alt={produto.name} height="140" image={produto.image} title={produto.name} className="max-h-[240px]" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">{produto.name}</Typography>
                  <Typography component="p">{produto.description}</Typography>
                </CardContent>
              </>
              <CardActions>
                <div className="flex justify-between w-full">
                  <div>
                    <Button size="small" color="primary" variant="contained" onClick={addProduto}>Adicionar</Button>
                  </div>
                  <div>
                    <Button size="small" color="primary">Editar</Button>
                    <Button size="small" color="primary">Deletar</Button>
                  </div>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default GetProdutos