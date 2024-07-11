import AuthContext from "../../contexts/Auth";
import { useContext, useState } from "react";
import { red } from "@mui/material/colors";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip, 
  IconButton, 
  Avatar, 
  Button
} from "@mui/material";

export default function NavBarLogin() {
  const context = useContext(AuthContext);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [loginInvalido, setLoginInvalido] = useState(false);
  const [contaCadastrada, setContaCadastrada] = useState(false);
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

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

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <div className="min-w-[185px] flex justify-end">
      <Tooltip title="Conta">
        {context.signed ? (
          <IconButton onClick={() => {}} sx={{ p: 0 }}>
            <Avatar {...stringAvatar(context.user.name)} />
          </IconButton>
        ) : (
          <IconButton onClick={handleLoginDialogOpen} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        )}
      </Tooltip>

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
    </div>
  )
}