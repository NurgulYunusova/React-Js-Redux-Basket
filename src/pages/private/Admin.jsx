/* eslint-disable no-unused-vars */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../../network/axiosInstance";
import {
  Button,
  Paper,
  CircularProgress,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";

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

function Admin() {
  const { data, error, isLoading, isSuccess, refetch } = useQuery(
    "productsData",
    () => {
      return axiosInstance.get("products");
    }
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editId, setEditId] = useState(0);

  const [addTitle, setAddTitle] = useState("");
  const [addPrice, setAddPrice] = useState(0);

  const queryClient = useQueryClient();

  const deleteProductMutation = async (productId) => {
    const response = axiosInstance.get(`products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  };

  const { mutate: deleteProduct } = useMutation(deleteProductMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const confirmDeleteProduct = (productId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      deleteProduct(productId);
    }
  };

  const edit = (item) => {
    handleOpen();

    setEditTitle(item.title);
    setEditPrice(item.price);
    setEditId(item.id);
  };

  const editSave = () => {
    mutation.mutate({ title: editTitle, price: editPrice });
    handleClose();
  };

  const mutation = useMutation({
    mutationFn: async (params) => {
      const { data } = await axiosInstance.put(`products/${editId}`, params);
      return data;
    },
    onSuccess: () => {
      alert("Success!");
      refetch();
    },
    onError: () => {
      alert("Error!");
    },
  });

  const add = () => {
    handleOpenAdd();
  };

  const addSave = () => {
    mutationAdd.mutate({ title: addTitle, price: addPrice });
    handleCloseAdd();
  };

  const mutationAdd = useMutation({
    mutationFn: async (params) => {
      const { data } = await axiosInstance.post("products", params);
      return data;
    },
    onSuccess: () => {
      alert("Success!");
      refetch();
    },
    onError: () => {
      alert("Error!");
    },
  });

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ margin: "100px auto 30px 280px" }}
        onClick={() => add()}
      >
        Add data
      </Button>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            style={{ width: 100, height: 100, margin: "150px" }}
          />
        </div>
      ) : (
        <>
          <TableContainer
            sx={{ width: 1000, margin: "0 auto 30px" }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Edit button</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Delete button
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {row.id}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>${row.price}</TableCell>
                      <TableCell>
                        <img
                          src={row.image}
                          alt={row.title}
                          width={50}
                          height={50}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" onClick={() => edit(row)}>
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => confirmDeleteProduct(row.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="">
                <div className="input-item">
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    sx={{ marginBottom: "10px" }}
                  />
                </div>
                <div className="input-item">
                  <TextField
                    id="standard-basic"
                    label="Price"
                    variant="standard"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </div>
              </form>
              <Button
                variant="contained"
                onClick={editSave}
                sx={{ marginTop: "10px" }}
              >
                Save
              </Button>
            </Box>
          </Modal>

          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="">
                <div className="input-item">
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    onChange={(e) => setAddTitle(e.target.value)}
                    sx={{ marginBottom: "10px" }}
                  />
                </div>
                <div className="input-item">
                  <TextField
                    id="standard-basic"
                    label="Price"
                    variant="standard"
                    onChange={(e) => setAddPrice(e.target.value)}
                    sx={{ marginBottom: "10px" }}
                  />
                </div>
              </form>
              <Button variant="contained" onClick={addSave}>
                {" "}
                Save{" "}
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default Admin;
