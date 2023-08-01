'use client'
import Header from '@/components/header/Header';
import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext } from 'react'

export default function Details() {
  
  const context = useContext(AppContext);
  const { selectedProduct } = context || {};

  const { title, price, description, category, image, rating } = selectedProduct;
  
  return (
    <section>
      <Header />
      <button
        type='button'
        onClick={() => {
          window.location.href = '/home';
        }}
      >
        Home
      </button>
      {
        selectedProduct && (
          <div>
            <h1>{title}</h1>
            <Image src={image} alt={title} width={200} height={200} />
            <p>{description}</p>
            <p>{price}</p>
            <p>{category}</p>
            <p>{rating.rate}</p>
            <p>{rating.count}</p>
            <button type="button">Add to cart</button>
          </div>
        )
      }
    </section>
  )
}
