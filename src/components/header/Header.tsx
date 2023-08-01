import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <section>
     <Image 
      src="https://istpay.com.br/wp-content/uploads/2022/01/Logo-Escrita-Laranja-Png-1.png"
      alt="logo"
      width="100"
      height="50" />
      <p>Store</p>
    </section>
  )
}

export default Header