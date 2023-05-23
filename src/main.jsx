import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { ProductsProvider } from "./context/BasketContext.jsx";
import { createStore } from "redux";
import basketReducer from "./reducers/basket.js";
import { Provider } from "react-redux";

const store = createStore(basketReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
