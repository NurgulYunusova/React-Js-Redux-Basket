/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";

function Navbar() {
  const navigate = useNavigate();
  const { basket, addToBasket } = useContext(ProductsContext);

  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        <AppBar position="fixed">
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
            <Button
              color="inherit"
              onClick={() => {
                navigate("/basket");
              }}
            >
              <ShoppingCartIcon style={{ marginRight: 10, marginLeft: 10 }} />{" "}
              {basket}
            </Button>
            <Button
              color="inherit"
              style={{ display: "flex", alignItems: "center", gap: 5 }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </Button>
            <Button
              color="inherit"
              style={{ display: "flex", alignItems: "center", gap: 5 }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
            {/* <Button
              color="inherit"
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              Profile <PersonIcon />
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
