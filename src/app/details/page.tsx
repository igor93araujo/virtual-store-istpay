'use client'
import Header from '@/components/header/Header';
import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { AiOutlineRollback } from 'react-icons/ai';
import './index.css'

export default function Details() {
  
  const { push } = useRouter();

  const context = useContext(AppContext);
  const { selectedProduct, setSelectedProduct, productsList, setCart, cart, setCartCount} = context || {};

  const {id, title, price, description, category, image } = selectedProduct;

  useEffect(() => {
    const localStorageVerify = () => {
      const recoveredItem = localStorage.getItem('selectedProduct');
      if (recoveredItem) {
        setSelectedProduct(JSON.parse(recoveredItem));
      }
    };
    localStorageVerify();
  }, [
    setSelectedProduct,
  ]);

  const handleCart = (id: number) => {
    const productToAdd = productsList.find((product: any) => product.id === id);
    if (productToAdd) {
      setCart((prevCart) => [...prevCart, productToAdd]);
      const cartStorage = JSON.stringify([...cart, productToAdd]);
      setCartCount((prevCount) => prevCount + 1);
      localStorage.setItem('cartStorage', cartStorage);
    }
  }
  
  
  return (
    <section>
      <Header />
      <div className='getBack-container' onClick={() => { push('/home')}} >
        <AiOutlineRollback />
        <p>Voltar</p>
      </div>
      <div className='detail-container'>
        <h1>Details</h1>
        { selectedProduct ? (
          <div className='detail-item-container-full'>
            <h2>{title}</h2>
          <div className='detail-item-container'>
              <Image src={image} alt='cartItem' width={200} height={200}/>
              <div className='detail-item-container-right'>
                <h4>{description.charAt(0).toUpperCase() + description.slice(1)}</h4>
                <p>{`Price: $${price}`}</p>
                <span>{`Category: ${category}`}</span>
                <button
                  type="button"
                  onClick={() => handleCart(id)}>
                    Add to cart
                </button>
              </div>
            </div>
            </div>
        ) : <p>Nenhum produto selecionado</p>
        }
       </div>
    </section>
  )
}
