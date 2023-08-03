'use client'
import Loading from '@/components/loading/Loading';
import { AppContext } from '@/context/AppProvider';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import Header from '@/components/header/Header';
import Aside from '@/components/aside/Aside';

import './index.css'

const Home = () => {

  const context = useContext(AppContext);
  const { selectedCategory, setSelectedProduct, setCart, productsList, setProductsList, cart, setCartCount} = context || {};
  const [isContainerScrolling, setIsContainerScrolling] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productsList.length / productsPerPage);
  
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

      const totalFilteredProducts = filteredData.length;
      const totalPagesFiltered = Math.ceil(totalFilteredProducts / productsPerPage);
      if (totalPagesFiltered === 1) {
        setCurrentPage(1);
      }
    };

    getAllProducts();
  }, [selectedCategory, setProductsList, productsPerPage]);

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
      setCartCount((prevCount) => prevCount + 1);
      localStorage.setItem('cartStorage', cartStorage);
    }
  };

  const truncateTitle = (title:string, maxLength:number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };

  const handleScrollContainer = () => {
    const containerElement = document.querySelector('.homeContainer-products');
    if (containerElement) {
      setIsContainerScrolling(containerElement.scrollTop >= 100);
    }
  };

  useEffect(() => {
    const containerElement = document.querySelector('.homeContainer-products');
    if (containerElement) {
      containerElement.addEventListener('scroll', handleScrollContainer);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('scroll', handleScrollContainer);
      }
    };
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  return (
    <section>
      <Header />
      <div className='homeContainer'>
        <Aside />
        <div className='homeContainer-fullproducts'>
          <h1 className={
            isContainerScrolling ? 'homeContainer-productsTitle-shadow' : 'homeContainer-productsTitle'
          }>Products</h1>
          <div className='homeContainer-products'>
          {selectedCategory !== undefined || selectedCategory !== 'all' ? (
              currentProducts.map((product: any) => (
                <div key={product.id} className='homeContainer-product'>
                    <Image src={product.image} alt={product.title} width={200} height={200} />
                    <div className='homeContainer-productInfo'>
                      <h2>{truncateTitle(product.title, 15)}</h2>
                      <p>{product.price}</p>
                    </div>
                    <div className='homeContainer-productBtns'>
                      <button
                        type="button"
                        onClick={() => handleProductDetails(product.id)}
                        className='homeContainer-productBtns-details'>
                          More details
                      </button>
                      <button
                        type='button'
                        onClick={() => handleCart(product.id)}
                        className='homeContainer-addToCart'  >
                        Add to Card
                      </button>
                    </div>
                  </div>
                ))) : (<Loading />)
              } 
        </div>
      <div className='pagination'>
        <button
          onClick={handlePrevPage} disabled={currentPage === 1}
          className='pagination-btn'
          >Previous</button>
        <span>{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages} 
          className='pagination-btn'>Next</button>
      </div>
        </div>
      </div>
    </section>
  );
}

export default Home;