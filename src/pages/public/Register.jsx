import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

function Register() {
  const addProductValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username field cannot be empty!")
      .max(50, "Maximum 50 character"),
    email: Yup.string()
      .required("Email field cannot be empty!")
      .email("Invalid email address!")
      .test("email", "Email must end with @code.edu.az", (value) => {
        return value.endsWith("@code.edu.az");
      }),
    gender: Yup.string().required("Gender field cannot be empty!"),
    password: Yup.string()
      .required("Password field cannot be empty!")
      .min(8, "Minimum 8 character")
      .matches(/^(?=.*[A-Z])/, "Password must start with an uppercase letter"),
    confirmPassword: Yup.string()
      .required("Confirm password field cannot be empty!")
      .min(8, "Minimum 8 character")
      .matches(/^(?=.*[A-Z])/, "Password must start with an uppercase letter")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "female",
      password: "",
      confirmPassword: "",
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
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Registration form
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                autoFocus
              />
              <p style={{ color: "red" }}>{formik.errors?.username}</p>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <p style={{ color: "red" }}>{formik.errors?.email}</p>

              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  checked={formik.values.gender == "female"}
                  onChange={formik.handleChange}
                  id="female"
                  name="gender"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  checked={formik.values.gender == "male"}
                  onChange={formik.handleChange}
                  id="male"
                  name="gender"
                />
              </RadioGroup>
              <p style={{ color: "red" }}>{formik.errors?.gender}</p>

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

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <p style={{ color: "red" }}>{formik.errors?.confirmPassword}</p>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Register;
