/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, CardActions } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useDispatch, useSelector } from "react-redux";

function Basket() {
  let basketProducts = useSelector((state) => state);

  console.log(basketProducts);
  let dispatch = useDispatch();
  const remove = (id) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: id });
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
          {basketProducts &&
            basketProducts.map((item) => (
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
                        onClick={() => remove(item.id)}
                      >
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
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default Basket;
