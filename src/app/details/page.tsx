'use client'
import Header from '@/components/header/Header';
import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function Details() {
  
  const { push } = useRouter();

  const context = useContext(AppContext);
  const { selectedProduct, setSelectedProduct, productsList, setCart, cart} = context || {};

  const {id, title, price, description, category, image } = selectedProduct;

  useEffect(() => {
    const localStorageVerify = () => {
      const recoveredItem = localStorage.getItem('selectedProduct');
      if (recoveredItem) {
        setSelectedProduct(JSON.parse(recoveredItem));
      }
    };
    localStorageVerify();
  }, [
    setSelectedProduct,
  ]);

  const handleCart = (id: number) => {
    const productToAdd = productsList.find((product: any) => product.id === id);
    if (productToAdd) {
      setCart((prevCart: any) => [...prevCart, productToAdd]);
      const cartStorage = JSON.stringify([...cart, productToAdd]);
      localStorage.setItem('cartStorage', cartStorage);
    }
  }

  
  return (
    <section>
      <Header />
      <button
        type='button'
        onClick={() => { push('/home')} }
      >
        Home
      </button>
      { selectedProduct ? (
          <div style={{ display: 'block', width: 700, padding: 30 }}>
            <h1>{title}</h1>
            <Image src={image} alt='cartItem' width={200} height={200}/>
            <p>{description}</p>
            <p>{price}</p>
            <p>{category}</p>
            <button
              type="button"
              onClick={() => handleCart(id)}>
                Add to cart
            </button>
          </div>
      ) : <p>Nenhum produto selecionado</p>
       }
    </section>
  )
}
