'use client'
import { AppContext } from '@/context/AppProvider';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import SubTotal from '@/components/subtotal/subTotal';

export default function Cart() {

 const context = useContext(AppContext);
  const { cart,setCart } = context || {};

  const removeItem = (id: string) => {
    const newCart = cart.filter((item:any) => item.id !== id);
    setCart(newCart);
  }

  useEffect(() => {
  const verifyCartStorage = () => {
    const recoveredCart = localStorage.getItem('cartStorage');
    console.log(recoveredCart)
    if (recoveredCart) {
      setCart(JSON.parse(recoveredCart));
    }
  };
  verifyCartStorage();
  }, [setCart]);


  return (
    <section>
     <p>Carrinho</p>
     {
      cart.length !== 0 ? (
        cart.map((product:any) => (
          <div key={product.id}>
            <Image src={product.image} alt={product.title} width={200} height={200} />
            <div>
              <h2>{product.title}</h2>
              <p>{product.price}</p>
            </div>
            <button
              type="button"
              onClick = {() => removeItem(product.id)}
              >
              
              Remove
            </button>
          </div>
        ))) : <p>Nenhum item no carrinho.</p>
        }
        <SubTotal />
    </section>
  );
}
