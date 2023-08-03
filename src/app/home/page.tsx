'use client'

import Loading from '@/components/loading/Loading';
import { AppContext } from '@/context/AppProvider';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import Header from '@/components/header/Header';
import Aside from '@/components/aside/Aside';

const Home = () => {

  const context = useContext(AppContext);
  const { selectedCategory, setSelectedProduct, setCart, productsList, setProductsList, cart} = context || {};

  const { push } = useRouter();

  type product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const URL = 'https://fakestoreapi.com/products';
      const response = await fetch(URL);
      const data: product[] = await response.json();
      const filteredData = data.filter((product) => {
        if (selectedCategory === '' || selectedCategory === 'all') {
          return product;
        } else {
          return product.category === selectedCategory;
        }
      });
      setProductsList(filteredData);
    };
    getAllProducts();
  }, [selectedCategory, setProductsList]);

  const handleProductDetails = (id: number) => {
    const productDetails = productsList.find((product:any) => product.id === id);
    if (productDetails) {
      setSelectedProduct(productDetails);
      //saving selectedProduct in localstorage
      localStorage.setItem('selectedProduct', JSON.stringify(productDetails));
      push(`/details/`);
    }
  };

  const handleCart = (id: number) => {
    const productToAdd = productsList.find((product: any) => product.id === id);
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, productToAdd]);
      const cartStorage = JSON.stringify([...cart, productToAdd]);
      localStorage.setItem('cartStorage', cartStorage);
    }
  }

  return (
    <section>
      <Header />
      <div>
        <Aside />
        <h1>Products</h1>
        {selectedCategory !== undefined || selectedCategory !== 'all' ? (
          productsList.map((product: any) => (
            <div key={product.id}>
              <Image src={product.image} alt={product.title} width={200} height={200} />
              <div>
                <h2>{product.title}</h2>
                <p>{product.price}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleProductDetails(product.id)}
                > More details </button>
                <button
                  type='button'
                  onClick={() => handleCart(product.id)}>
                  Add to Card
                </button>
              </div>
            </div>
          ))) : (<Loading />)
        } 
      </div>
    </section>
  );
}

export default Home;
