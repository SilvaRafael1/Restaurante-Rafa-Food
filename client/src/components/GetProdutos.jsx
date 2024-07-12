import { Grid, Card, CardContent, CardMedia, Button, Typography, CardActions, Fab } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "../theme/CreateTheme";
import client from "../api/Api";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/Auth";
import DeleteProduto from "./DeleteProduto";

const GetProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0)

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

  const context = useContext(AuthContext);
  const handleAdmin = () => {
    if (context.user.role == "admin") {
      return true
    }
    
    return false
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div style={{ marginTop: 20, padding: 30 }}>
        <div className="fixed bottom-8 right-12">
          <NavLink to={"/createPedido"} state={{ produtos: sacola }}>
            <Fab color="primary" aria-label="Sacola">
              <ShoppingBag />
            </Fab>
          </NavLink>

          <Fab color="secondary" aria-label="Quantidade" size="small" style={{ position: "absolute", left: "35px", bottom: "25px" }}>
            {totalProdutos}
          </Fab>
        </div>

        <Grid container spacing={15} justify="center">
          {produtos.map(produto => (
            <Grid item key={produto._id}>
              <Card className="max-w-[360px]">
                <>
                  <CardMedia component="img" alt={produto.name} height="140" image={produto.image} title={produto.name} className="h-[240px]" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{produto.name}</Typography>
                    <Typography component="p">{produto.description}</Typography>
                    <Typography component="p"><b>Preço: </b>R${produto.price}</Typography>
                  </CardContent>
                </>
                <CardActions>
                  <div className="flex justify-between w-full">
                    <div>
                      <Button size="small" color="primary" variant="contained" onClick={() => {
                        let novaQuantidade = totalProdutos
                        novaQuantidade++
                        setTotalProdutos(novaQuantidade)
                        sacola.push(produto._id)
                      }}>
                        Adicionar
                      </Button>
                    </div>
                    {handleAdmin() ? (
                      <div>
                        <NavLink to={"/updateProduto/" + produto._id}>
                          <Button size="small" color="primary">Editar</Button>
                        </NavLink>
                        <DeleteProduto id={produto._id} />
                      </div>
                    ) : ""}
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default GetProdutos