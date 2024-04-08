import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "./theme/CreateTheme";
import NavBar from "./components/NavBar"

// Components
import GetProdutos from "./components/GetProdutos"
import CreateProduto from "./components/CreateProduto";
import UpdateProduto from "./components/UpdateProduto";
import DeleteProduto from "./components/DeleteProduto";
import GetPedidos from "./components/GetPedidos";
import GetRandom from "./components/GetRandom";
import CreatePedido from "./components/CreatePedido";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ThemeProvider theme={DefaultTheme}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <Typography variant="h4" color="inherit">
                Rafa's Food
              </Typography>
              <NavBar />
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <div>
          <Routes>
            <Route exact path="/" Component={GetProdutos} />
            <Route path="/createProduto" Component={CreateProduto} />
            <Route path="/updateProduto/:id" Component={UpdateProduto} />
            <Route path="/deleteProduto/:id" Component={DeleteProduto} />
            <Route path="/getPedidos" Component={GetPedidos} />
            <Route path="/produtos/random" Component={GetRandom} />
            <Route path="/createPedido" Component={CreatePedido} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
