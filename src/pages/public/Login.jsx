/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

function Login() {
  // const navigate = useNavigate();

  const addProductValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email field cannot be empty!")
      .email("Invalid email address!")
      .test("email", "Email must end with @code.edu.az", (value) => {
        return value.endsWith("@code.edu.az");
      }),
    password: Yup.string()
      .required("Password field cannot be empty!")
      .min(8, "Minimum 8 character")
      .matches(/^(?=.*[A-Z])/, "Password must start with an uppercase letter"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: addProductValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      // navigate("/home");
    },
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                autoFocus
              />
              <p style={{ color: "red" }}>{formik.errors?.email}</p>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p style={{ color: "red" }}>{formik.errors?.password}</p>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
