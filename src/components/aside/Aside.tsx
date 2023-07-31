'use client';
import React, { useEffect, useState } from 'react'

function Aside() {

 const [categories, setCategories] = useState([])

 useEffect(() => {
  const getAllCategories = async () => {
   const URL = 'https://fakestoreapi.com/products/categories';
   const response = await fetch(URL);
   const data = await response.json();
   setCategories(data);
   return data;
  }
  getAllCategories()
 }, [])
 
  return (
    <aside>
      <h2>Categories</h2>
      {
        categories.map((category: string) => (
          <div key={category}>
            <input type="checkbox" name={category} id={category} />
            <label htmlFor={category}>{category}</label>
          </div>
        ))
      }
    </aside>
  )
}

export default Aside;