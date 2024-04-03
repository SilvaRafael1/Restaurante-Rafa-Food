import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home } from "@mui/icons-material";

function NavBar() {
    return (
        <List component="div">
            <ListItem component="div">
                <ListItemText inset>
                    <Typography color="inherit" variant="h6"><NavLink to={"/"} className="nav-link"><Home />Home</NavLink></Typography>
                </ListItemText>
            </ListItem>
        </List>
    )
}

export default NavBar;