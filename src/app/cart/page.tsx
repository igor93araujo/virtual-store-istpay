'use client'
import { AppContext } from '@/context/AppProvider';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import SubTotal from '@/components/subtotal/subTotal';
import './index.css'
import Header from '@/components/header/Header';
import { AiOutlineRollback } from 'react-icons/ai';
import { useRouter } from "next/navigation";

export default function Cart() {

 const context = useContext(AppContext);
  const { cart,setCart, setCartCount } = context || {};

  const { push } = useRouter();

  const removeItem = (id: string) => {
    if (!cart) return; // Verifica se o cart é undefined antes de continuar
    const newCart = cart.filter((item: any) => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cartStorage', JSON.stringify(newCart));
  };

  useEffect(() => {
    const verifyCartStorage = () => {
      const recoveredCart = localStorage.getItem('cartStorage');
      console.log(recoveredCart);
      if (recoveredCart) {
        setCart(JSON.parse(recoveredCart));
      }
    };
    verifyCartStorage();
  }, [setCart, setCartCount]);

  if (!context) {
    // Caso o contexto não tenha sido carregado ainda, pode renderizar uma mensagem ou um componente de carregamento
    return <div>Carregando...</div>;
  }

  return (
    <section className='cartFullSection'>
      <Header />
      <div className='getBack-container' onClick={() => { push('/home')}} >
        <AiOutlineRollback />
        <p>Voltar</p>
      </div>
     <h2 className='cartTitle'>Carrinho</h2>
     <div className='cartC'>
        <div className='cartContainer'>
          {
            cart.length !== 0 ? (
              cart.map((product:any) => (
                <div key={product.id} className='cartContainerLeft' >
                  <Image src={product.image} alt={product.title} width={200} height={200} />
                  <div className="cartContainerTitle">
                    <h2>{product.title.charAt(0).toUpperCase() + product.title.slice(1)}</h2>
                    <p>{`Price: $${product.price}`}</p>
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
        </div>
          <div className='subtotal'>
            <SubTotal/>
          </div>
      </div>
    </section>
  );
}
