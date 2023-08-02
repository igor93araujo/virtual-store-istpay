'use client'
import Header from '@/components/header/Header';
import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { useRouter } from "next/navigation";

export default function Details() {
  
  const { push } = useRouter();

  const context = useContext(AppContext);
  const { selectedProduct, setSelectedProduct } = context || {};

  const { title, price, description, category, image, rating } = selectedProduct;

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
{/*             <p>{rating.rate}</p>
            <p>{rating.count}</p> */}
            <button type="button">Add to cart</button>
          </div>
      ) : <p>Nenhum produto selecionado</p>
       }
    </section>
  )
}
