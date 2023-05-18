/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { axiosInstance } from "../network/axiosInstance";
import { useQuery } from "react-query";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Products() {
  const { data, error, isLoading, isSuccess, refetch } = useQuery(
    "productsData",
    () => {
      return axiosInstance.get("products");
    }
  );

  const { basket, addToBasket } = useContext(ProductsContext);

  const handleAddToBasket = () => {
    addToBasket();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 8 }}
          style={{ marginTop: 70 }}
        >
          {data &&
            data?.data.map((q) => (
              <Grid item xs={4}>
                <Card sx={{ height: "100%" }}>
                  <div
                    style={{
                      padding: "10px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={q.image}
                      alt={q.title}
                      sx={{ height: 200, objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {q.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {q.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        ${q.price}
                      </Typography>
                      <Button variant="contained" onClick={handleAddToBasket}>
                        Add to Basket
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

export default Products;
