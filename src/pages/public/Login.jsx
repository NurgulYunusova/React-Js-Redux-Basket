/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const addProductValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email field cannot be empty!")
      .email("Invalid email address!"),
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

      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        const userExists = userData.some(
          (user) =>
            user.email == values.email && user.password == values.password
        );

        if (userExists) {
          navigate("/admin");
          return;
        } else {
          alert("Wrong email address or password!");
        }
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        style={{ margin: "150px auto 0", width: 300 }}
      >
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
      <div style={{ width: 250, margin: "0 auto" }}>
        <p>
          If you haven't account:{" "}
          <Link to="/register" style={{ color: "gray" }}>
            Create Account
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
