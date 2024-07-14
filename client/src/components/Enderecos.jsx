import api from "../api/Api"
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "../theme/CreateTheme";
import { useContext, useEffect, useState } from "react";
import DeleteEndereco from "./DeleteEndereco";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthContext from "../../contexts/Auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

export default function Enderecos () {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [enderecos, setEnderecos] = useState([]);

  const listEnderecos = async () => {
    try {
      const res = await api.post("/enderecos", { userId: context.user.id})
      if(res.data) {
        setEnderecos(res.data)
      } else {
        setEnderecos([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listEnderecos()
  }, [])

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={DefaultTheme}>
      <div className="flex justify-center flex-col items-center">
        <div className="max-w-fit my-5">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Endereços Salvos</b></TableCell>
                  <TableCell align="right"><b>Ações</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {enderecos.map((endereco) => (
                  <TableRow
                    key={endereco.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {endereco.endereco}
                    </TableCell>
                    <TableCell align="right">
                      <DeleteEndereco id={endereco.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              formJson.userId = context.user.id;
              await api.post("/enderecos/new", formJson);
              navigate("/");
            },
          }}
        >
          <DialogTitle>Adicionar Endereço</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insira o nome da rua e número.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="endereco"
              name="endereco"
              label="Endereço"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Adicionar</Button>
          </DialogActions>
        </Dialog>

        <Button variant="outlined" onClick={handleClickOpen}>
          Adicionar Endereço
        </Button>
      </div>
    </ThemeProvider>
  )
}