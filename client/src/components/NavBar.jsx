import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home, Add, ShoppingBagOutlined, Shuffle } from "@mui/icons-material";
import "../css/NavLinkStyle.css";

function NavBar() {
  return (
    <>
      <Typography variant="h4" color="inherit">
        Rafa's Food
      </Typography>
      <List component="div">
        <ListItem component="div">
          <ListItemText inset>
            <Typography color="inherit" variant="h6">
              <NavLink to={"/"} className="nav-link">
                <Home />
                Home
              </NavLink>
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="h6">
              <NavLink to={"/createProduto"} className="nav-link">
                <Add />
                Criar Produto
              </NavLink>
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="h6">
              <NavLink to={"/getPedidos"} className="nav-link">
                <ShoppingBagOutlined />
                Pedidos
              </NavLink>
            </Typography>
          </ListItemText>
          <ListItemText inset>
            <Typography color="inherit" variant="h6">
              <NavLink to={"/produtos/random"} className="nav-link">
                <Shuffle />
                Produto Aleatório
              </NavLink>
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
}

export default NavBar;
