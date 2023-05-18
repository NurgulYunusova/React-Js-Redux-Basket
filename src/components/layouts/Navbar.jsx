import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import { IconButton, MenuItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";

function Navbar() {
  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <StoreIcon />
              E-commerce
              <Button color="inherit" style={{ marginLeft: 40 }}>
                Products
              </Button>
            </Typography>
            <Button color="inherit">
              <ShoppingCartIcon style={{ marginRight: 20, marginLeft: 20 }} />
            </Button>
            <Button
              color="inherit"
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              Profile <PersonIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
