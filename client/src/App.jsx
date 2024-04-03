import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "./theme/CreateTheme";
import NavBar from "./components/NavBar"
import GetProdutos from "./components/GetProdutos"

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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
