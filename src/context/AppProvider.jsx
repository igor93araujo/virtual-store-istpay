'use client'

import { useMemo, useState } from 'react';
import { AppContext } from './AppContext';

function AppProvider({ children }) {
  

  const [ productCategory, setProductCategory ] = useState([]);
  const [cart, setCart] = useState([]);

  const context = useMemo(
    () => ({
      productCategory,
      setProductCategory,
      cart,
      setCart,
    }),
    [
      productCategory,
      setProductCategory,
      cart,
      setCart,
    ],
  );

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
