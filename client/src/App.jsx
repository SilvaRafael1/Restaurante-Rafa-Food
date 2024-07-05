import { BrowserRouter } from "react-router-dom"
import { AppBar, Toolbar } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "./theme/CreateTheme";
import NavBar from "./components/NavBar";
import NavBarLogin from "./components/NavBarLogin";
import IndexRoutes from "./routes/Index";
import { AuthProvider } from "../contexts/Auth";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ThemeProvider theme={DefaultTheme}>
          <AppBar color="primary" position="static">
            <Toolbar>
              <div className="h-full w-full flex flex-row items-center content-center justify-between">
                <NavBar />
                <NavBarLogin />
              </div>
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <div>
          <AuthProvider>
            <IndexRoutes />
          </AuthProvider>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
