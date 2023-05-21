/* eslint-disable react/jsx-key */
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import "./app.css";
import Basket from "./pages/public/Basket";
import Register from "./pages/public/Register";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./components/layout/Layout";
import Products from "./pages/public/Products";
import Admin from "./pages/private/Admin";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
