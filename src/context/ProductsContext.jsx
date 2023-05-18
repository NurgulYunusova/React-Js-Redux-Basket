/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [basket, setBasket] = useState(0);

  const addToBasket = () => {
    setBasket((prevBasket) => prevBasket + 1);
  };

  return (
    <ProductsContext.Provider
      value={{
        basket,
        addToBasket,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
