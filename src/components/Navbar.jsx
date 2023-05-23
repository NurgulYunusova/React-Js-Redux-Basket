/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppBar position="fixed">
          <Toolbar
            style={{
              backgroundColor: "#2B3467",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StoreIcon />
              E-commerce
              <Button
                color="inherit"
                style={{ marginLeft: 40 }}
                onClick={() => {
                  navigate("/");
                }}
              >
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
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
