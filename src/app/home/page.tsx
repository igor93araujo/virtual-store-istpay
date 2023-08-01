'use client';
import Button from '@/components/button/Button';
import Loading from '@/components/loading/Loading';
import { AppContext } from '@/context/AppProvider';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import Header from '@/components/header/Header';
import Aside from '@/components/aside/Aside';

const Home = () => {

  const [productsList, setProductsList] = useState<product[]>([]);

  const context = useContext(AppContext);
  const { selectedCategory, setSelectedProduct } = context || {};

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
    const productDetails = productsList.find((product) => product.id === id);
    if (productDetails) {
      setSelectedProduct(productDetails);
      push(`/details/`);
    }
  };

  return (
    <section>
      <Header />
      <Aside  />
      <h1>Products</h1>
      {selectedCategory !== undefined || selectedCategory !== 'all' ? (
        productsList.map((product) => (
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
              <Button title="Add to cart" />
            </div>
          </div>
        ))) : (<Loading />)
      }
    </section>
  );
}

export default Home;
