/* eslint-disable no-unused-vars */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useQuery } from "react-query";
import { axiosInstance } from "../../network/axiosInstance";
import { Button, Paper } from "@mui/material";

function Admin() {
  const { data, error, isLoading, isSuccess, refetch } = useQuery(
    "productsData",
    () => {
      return axiosInstance.get("products");
    }
  );

  return (
    <>
      <TableContainer
        sx={{ width: 1000, margin: "100px auto" }}
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
              <TableCell sx={{ fontWeight: "bold" }}>Delete button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontWeight: "bold" }}>{row.id}</TableCell>
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
                    <Button variant="outlined">Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Admin;