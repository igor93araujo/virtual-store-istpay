'use client'
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type ContextType = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<ContextType | null>(null);
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <AppContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
