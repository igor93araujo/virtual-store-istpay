'use client'
import { AppContext } from '@/context/AppProvider';
import React, { useContext } from 'react'
import Image from 'next/image';

export default function Cart() {

 const context = useContext(AppContext);
  const { cart } = context || {};

 console.log(cart)

  return (
    <section>
     <p>Carrinho</p>
     {
      cart ? (
        cart.map((product:any) => (
          <div key={product.id}>
            <Image src={product.image} alt={product.title} width={200} height={200} />
            <div>
              <h2>{product.title}</h2>
              <p>{product.price}</p>
            </div>
          </div>
        ))) : <p>Nenhum item no carrinho (ainda)</p>
        }
    </section>
  );
}
