/* eslint-disable react/jsx-key */
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
// import { routes } from "./routes/routes";
import Home from "./pages/public/Home";
import "./app.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* {routes &&
            routes.map((item) => {
              return <Route path={item.path} element={item.element} />;
            })} */}

          <Route path="/" element={<Home />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
