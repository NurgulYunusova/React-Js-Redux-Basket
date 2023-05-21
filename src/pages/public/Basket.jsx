/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext } from "react";
import { BasketContext } from "../../context/BasketContext";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActions } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function Basket() {
  const {
    basketItems,
    addToBasket,
    removeFromBasket,
    calculateTotalPrice,
    clearBasket,
  } = useContext(BasketContext);

  const handleAction = (product) => {
    if (!basketItems.some((item) => item.id === product.id)) {
      addToBasket(product);
    } else removeFromBasket(product);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          style={{ marginTop: 70 }}
        >
          {basketItems &&
            basketItems.map((item) => (
              <Grid item xs={3}>
                <Card sx={{ height: "100%" }}>
                  <div
                    style={{
                      padding: "10px",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title} -{" "}
                        <span style={{ color: "#EB455F", fontWeight: 700 }}>
                          ${item.price}
                        </span>
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{ height: 200, objectFit: "contain" }}
                    />
                    <CardActions
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleAction(item)}
                      >
                        {!basketItems.some((q) => q.id === item.id) ? (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: 3,
                            }}
                          >
                            <AddShoppingCartIcon />
                            Add to basket
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: 3,
                            }}
                          >
                            <RemoveShoppingCartIcon />
                            Remove from basket
                          </span>
                        )}
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            ))}
        </Grid>
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={() => clearBasket()}
        >
          Clear All
        </Button> */}
        <Typography variant="h4">
          Total price: ${calculateTotalPrice()}
        </Typography>
      </Box>
    </>
  );
}

export default Basket;
