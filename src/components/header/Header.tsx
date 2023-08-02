import React from 'react'
import Image from 'next/image'
import { BsCart4 } from 'react-icons/bs'
import { useRouter } from "next/navigation";

function Header() {

  const { push } = useRouter();

  return (
    <section>
     <Image 
      src="https://istpay.com.br/wp-content/uploads/2022/01/Logo-Escrita-Laranja-Png-1.png"
      alt="logo"
      width="100"
      height="50" />
      <p>Store</p>
      <BsCart4
        onClick={() => { push('/cart')}
      }
      />
    </section>
  )
}

export default Header