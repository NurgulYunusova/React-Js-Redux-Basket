/* eslint-disable react/jsx-key */
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./components/layout/Layout";
import { publicRoutes } from "./routes/publicRoutes";
import { privateRoutes } from "./routes/privateRoutes";
import "./app.css";

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
            {publicRoutes &&
              publicRoutes.map((route) => {
                return <Route path={route.path} element={route.element} />;
              })}
            {privateRoutes &&
              privateRoutes.map((r) => {
                return <Route path={r.path} element={r.element} />;
              })}
          </Routes>
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
