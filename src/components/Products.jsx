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
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Products() {
  const { data, error, isLoading, isSuccess, refetch } = useQuery(
    "productsData",
    () => {
      return axiosInstance.get("products");
    }
  );

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const { basket, addToBasket } = useContext(ProductsContext);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  let itemData = data?.data.find((item) => item.id == id);

  const handleClose = () => setOpen(false);

  const actionToBasket = () => {
    setIsClicked(!isClicked);
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
          {data &&
            data?.data.map((q) => (
              <Grid item xs={2}>
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
                      <Button variant="contained" onClick={actionToBasket}>
                        {isClicked ? "Remove from basket" : "Add to basket"}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleOpen(q.id)}
                      >
                        Show details
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </Grid>
            ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                {itemData?.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {itemData?.description}
              </Typography>
            </Box>
          </Modal>
        </Grid>
      </Box>
    </>
  );
}

export default Products;
