import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home, Add } from "@mui/icons-material";
import "../css/NavLinkStyle.css";

function NavBar() {
  return (
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
      </ListItem>
    </List>
  );
}

export default NavBar;
