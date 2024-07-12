import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home, Add, ShoppingBagOutlined, Shuffle } from "@mui/icons-material";
import "../css/NavLinkStyle.css";
import AuthContext from "../../contexts/Auth";
import { useContext } from "react"

function NavBar() {
  const context = useContext(AuthContext);

  return (
    <>
      <Typography variant="h4" color="inherit">
        Rafa's Food
      </Typography>
      <List component="div">
        <ListItem component="div">
          <ListItemText inset>
            <Typography color="inherit" variant="h6">
              <NavLink to={"/"} className="nav-link flex items-center">
                <Home />
                Home
              </NavLink>
            </Typography>
          </ListItemText>

          {context.signed ? (
            <>
              <ListItemText inset>
                <Typography color="inherit" variant="h6">
                  <NavLink to={"/getPedidos"} className="nav-link flex items-center">
                    <ShoppingBagOutlined />
                    Pedidos
                  </NavLink>
                </Typography>
              </ListItemText>
              <ListItemText inset>
                <Typography color="inherit" variant="h6">
                  <NavLink to={"/produtos/random"} className="nav-link flex items-center">
                    <Shuffle />
                    Produto Aleatório
                  </NavLink>
                </Typography>
              </ListItemText>
            </>
          ) : (<></>)}
        </ListItem>
      </List>
    </>
  );
}

export default NavBar;
