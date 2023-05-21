/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const BasketContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState(() => {
    const storedBasketItems = localStorage.getItem("basketItems");
    return storedBasketItems ? JSON.parse(storedBasketItems) : [];
  });

  const addToBasket = (product) => {
    if (!basketItems.some((item) => item.id === product.id)) {
      const updatedBasket = [...basketItems, product];
      setBasketItems(updatedBasket);
      localStorage.setItem("basketItems", JSON.stringify(updatedBasket));
    }
  };

  const removeFromBasket = (product) => {
    const updatedBasket = basketItems.filter((item) => item.id !== product.id);
    setBasketItems(updatedBasket);
    localStorage.setItem("basketItems", JSON.stringify(updatedBasket));
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    basketItems.forEach((item) => {
      totalPrice += item.price;
    });

    return totalPrice;
  };

  console.log(basketItems);

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addToBasket,
        removeFromBasket,
        clearBasket,
        calculateTotalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
