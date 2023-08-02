'use client'
import Header from '@/components/header/Header';
import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function Details() {
  
  const { push } = useRouter();

  const context = useContext(AppContext);
  const { selectedProduct, setSelectedProduct, productsList, setCart} = context || {};

  const {id, title, price, description, category, image } = selectedProduct;

  useEffect(() => {
    const localStorageVerify = async () => {
      const recoveredItem = await localStorage.getItem('selectedProduct');
      if (recoveredItem) {
        console.log('selectedProduct', recoveredItem);
        setSelectedProduct(JSON.parse(recoveredItem));
      }
    };
    localStorageVerify();
  }, [
    setSelectedProduct,
  ]);

  const handleCart = (id: number) => {
    const productToAdd = productsList.find((product) => product.id === id);
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, productToAdd]);
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
