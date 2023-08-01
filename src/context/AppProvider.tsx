'use client'
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type ContextType = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedProduct: any;
  setSelectedProduct: Dispatch<SetStateAction<any>>;
  cart: any,
  setCart: Dispatch<SetStateAction<any>>;
};

const AppContext = createContext<ContextType | null>(null);
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider value={{ selectedCategory, setSelectedCategory, selectedProduct, setSelectedProduct, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
