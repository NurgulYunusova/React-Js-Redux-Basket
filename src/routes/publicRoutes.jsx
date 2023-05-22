import Basket from "../pages/public/Basket";
import Login from "../pages/public/Login";
import Products from "../pages/public/Products";
import Register from "../pages/public/Register";

export const publicRoutes = [
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
];
