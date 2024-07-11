import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/Auth";
import client from "../api/Api";
import DefaultTheme from "../theme/CreateTheme";
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography, 
  CardActions, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { red } from "@mui/material/colors";

export default function Guest() {
  const context = useContext(AuthContext)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginInvalido, setLoginInvalido] = useState(false);
  const [contaCadastrada, setContaCadastrada] = useState(false);
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);
  const [produtos, setProdutos] = useState([]);

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

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };
  
  const handleRegisterDialogOpen = () => {
    setRegisterDialogOpen(true);
  };

  const handleRegisterDialogClose = () => {
    setRegisterDialogOpen(false);
  };

  const handleLoginToRegister = () => {
    setLoginDialogOpen(false)
    setRegisterDialogOpen(true)
  }
  
  const handleRegisterToLogin = () => {
    setRegisterDialogOpen(false)
    setLoginDialogOpen(true)
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div style={{ marginTop: 20, padding: 30 }}>
        <Grid container spacing={15} justify="center">
          {produtos.map(produto => (
            <Grid item key={produto._id}>
              <Card className="max-w-[360px]">
                <>
                  <CardMedia 
                    component="img" 
                    alt={produto.name} 
                    height="140" 
                    image={produto.image} 
                    title={produto.name} 
                    className="h-[240px]" 
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{produto.name}</Typography>
                    <Typography component="p">{produto.description}</Typography>
                    <Typography component="p"><b>Preço: </b>R${produto.price}</Typography>
                  </CardContent>
                </>
                <CardActions>
                  <div className="flex justify-between w-full">
                    <div>
                      <Button size="small" color="primary" variant="contained" onClick={handleLoginDialogOpen}>
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog
        open={loginDialogOpen}
        onClose={handleLoginDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const response = await context.Login(formJson)
            
            if(response == "Não autorizado") {
              return setLoginInvalido(true);
            }
            
            if(response == "Senha incorreta") {
              setLoginInvalido(false)
              return setSenhaIncorreta(true);
            }

            handleLoginDialogClose();
          },
        }}
      >
        <DialogTitle>Realizar Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para criar um pedido deve primeiro estar logado no sistema.
          </DialogContentText>
          {loginInvalido ? (
            <DialogContentText color={red} className="flex justify-center text-red-500">
              Conta não encontrada, favor realizar cadastro!
            </DialogContentText>
          ) : ""}
          {senhaIncorreta ? (
            <DialogContentText color={red} className="flex justify-center text-red-500">
              Senha incorreta!
            </DialogContentText>
          ) : ""}
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <div className="flex justify-between w-full">
            <Button variant="outlined" onClick={handleLoginToRegister}>Cadastrar-se</Button>
            <div>
              <Button onClick={handleLoginDialogClose}>Cancelar</Button>
              <Button type="submit" variant="contained">Entrar</Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={registerDialogOpen}
        onClose={handleRegisterDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const response = await client.post("/register", formJson)
            
            if(response.data == "Conta já cadastrada, favor realizar login!") {
              return setContaCadastrada(true);
            }

            handleRegisterDialogClose();
            handleLoginDialogOpen();
          },
        }}
      >
        <DialogTitle>Realizar Cadastro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor preencha o formulário para criar uma conta.
          </DialogContentText>
          {contaCadastrada ? (
            <DialogContentText color={red} className="flex justify-center text-red-500">
              E-mail já cadastrado, favor realizar login!
            </DialogContentText>
          ) : ""}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nome Completo"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Senha"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterToLogin}>Voltar</Button>
          <Button type="submit" variant="contained">Cadastrar-se</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}