'use client'
import Image from 'next/image';
import React, { useState, useEffect, use } from 'react'

const Main = () => {

 const [ productsList, setProductsList ] = useState([]);

 useEffect(() => {
 const getAllProducts = async () => {
  const URL = 'https://fakestoreapi.com/products'
  const response = await fetch(URL);
  const data = await response.json();
  setProductsList(data);
  return data;
 };
 getAllProducts();
 }, []);

  return (
    <section>
      <h1>Products</h1>
      <div>
        {
        productsList &&
        productsList.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Image src={product.image} alt={product.title} width={200} height={200} />
            </div>
        ))}
      </div>
    </section>
  )
}

export default Main;