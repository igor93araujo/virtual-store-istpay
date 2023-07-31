'use client'
import Button from '@/components/button/Button';
import Loading from '@/components/loading/Loading';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

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
        {
        productsList ?
        productsList.map((product) => (
          <div key={product.id}>
            <Image src={product.image} alt={product.title} width={200} height={200} />
            <div>
             <h2>{product.title}</h2>
             <p>{product.description}</p>
             <p>{product.price}</p>
             <p>{`Rate: ${product.rating.rate}`}</p>
            </div>
            <div>
              <Button title="Add to cart" />
            </div>
          </div>
        )) : <Loading />
       
       }
    </section>
  )
}

export default Main;