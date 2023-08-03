import { AppContext } from '@/context/AppProvider';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

export default function SubTotal() {

 const [total, setTotal] = useState(0);

 const context = useContext(AppContext);
 const { cart } = context || {};

 useEffect(() => {
  const calculateTotal = () => {
    if (cart) {
      const total = cart.reduce((acc:any, curr:any) => {
        return acc + curr.price;
      }, 0);
      setTotal(total);
    }
 }
  calculateTotal();
  }, [cart]);

  return (
   <section>
    <p>Purchase Summary</p>
    {
      cart ? (
        cart.map((product:any) => (
          <div key={product.id}>
            <Image src={product.image} alt={product.title} width={200} height={200} />
            <p>{product.price}</p>
          </div>
        ))
      ) : <p>Nenhum item no carrinho</p> 
    }
    <div>
      <p>{`Sub-total: $ ${ total }`}</p>
    </div>
  </section>
  );
}
