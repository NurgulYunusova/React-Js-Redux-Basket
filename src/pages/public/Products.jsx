/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { axiosInstance } from "../../network/axiosInstance";
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
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";

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
  const [id, setId] = useState();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  let itemData = data?.data.find((item) => item.id == id);

  const handleClose = () => setOpen(false);
  let dispatch = useDispatch();

  const handleAddToBasket = (product) => {
    dispatch({ type: "ADD_TO_BASKET", payload: product });
  };

  const handleRemoveToBasket = (id) => {
    dispatch({ type: "REMOVE_FROM_BASKET", payload: id });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: "40px" }}>
        {isLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              style={{ width: 100, height: 100, margin: "300px" }}
            />
          </div>
        ) : (
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            style={{ marginTop: 70 }}
          >
            {data &&
              data?.data.map((q) => (
                <Grid item xs={3}>
                  <Card sx={{ height: "100%" }}>
                    <div
                      style={{
                        padding: "15px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={q.image}
                        alt={q.title}
                        sx={{ height: 180, objectFit: "contain" }}
                      />
                      <CardContent sx={{ padding: "10px" }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{
                            textTransform: "uppercase",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          {q.title}
                        </Typography>
                      </CardContent>
                      <CardContent sx={{ padding: 0 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            margin: "0px",
                          }}
                        >
                          ${q.price}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => handleOpen(q.id)}
                        >
                          More details
                        </Button>
                      </CardActions>
                      <CardActions
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => handleAddToBasket(q)}
                        >
                          Add to basket
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveToBasket(q.id)}
                        >
                          Remove from basket
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
                  sx={{
                    fontWeight: "bold",
                    color: "#3566b5",
                    textAlign: "center",
                  }}
                >
                  {itemData?.title}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  {itemData?.description}
                </Typography>
              </Box>
            </Modal>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default Products;
