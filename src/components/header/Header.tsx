import React from 'react'
import Image from 'next/image'
import { BsCart4 } from 'react-icons/bs'
import { useRouter } from "next/navigation";
import './Header.css'

function Header() {

  const { push } = useRouter();

  return (
    <section className='headerContainer'>
      <div className='headerContainer-left'>
        <Image 
          src="https://istpay.com.br/wp-content/uploads/2022/01/Logo-Escrita-Laranja-Png-1.png"
          alt="logo"
          width="100"
          height="50" />
          <p>Store</p>
      </div>
      <BsCart4
        className='headerContainer-right'
        onClick={() => { push('/cart')}
      }
      />
    </section>
  )
}

export default Header