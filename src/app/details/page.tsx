'use client'
import Header from '@/components/header/Header';
import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext } from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function Details() {
  
  const context = useContext(AppContext);
  const { selectedProduct, setSelectedProduct } = context || {};

  const { title, price, description, category, image, rating } = selectedProduct;

/*   useEffect(() => {
    const localStoreVerify = () => {
      const selectedProduct = localStorage.getItem('selectedProduct');
      if (selectedProduct) {
        setSelectedProduct(JSON.parse(selectedProduct));
      }
    };
    localStoreVerify();
  }, [setSelectedProduct]); */

  
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
        selectedProduct ? (
          <div style={{ display: 'block', width: 700, padding: 30 }}>
            <h1>{title}</h1>
              <Carousel fade>
                <Carousel.Item>
                  <Image src={image} alt={title} width={200} height={200} className='d-block w-100'/>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={image} alt={title} width={200} height={200} className='d-block w-100'/>
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={image} alt={title} width={200} height={200} className='d-block w-100'/>
                </Carousel.Item>
              </Carousel>
            <p>{description}</p>
            <p>{price}</p>
            <p>{category}</p>
            <p>{rating.rate}</p>
            <p>{rating.count}</p>
            <button type="button">Add to cart</button>
          </div>
        )
       : <p>Nenhum item selecionado</p> }
    </section>
  )
}
