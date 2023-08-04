import React, { useContext } from 'react';
import Image from 'next/image';
import { BsCart4 } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import './index.css';

function Header() {
  const { push } = useRouter();
  const storage = typeof window !== 'undefined' && localStorage.getItem('cartStorage') || '[]';
  const cartItems = JSON.parse(storage);
  const cartCount = cartItems.length;

  return (
    <section className='headerContainer'>
      <div className='headerContainer-left'>
        <Image
          src='https://istpay.com.br/wp-content/uploads/2022/01/Logo-Escrita-Laranja-Png-1.png'
          alt='logo'
          width='100'
          height='50'
        />
        <p>Store</p>
      </div>
      <div className='header-cartContainer'>
        <BsCart4
          className='headerContainer-right'
          onClick={() => {
            push('/cart');
          }}
        />
        <span className='headerContainer-right'>{cartCount}</span>
      </div>
    </section>
  );
}

export default Header;
