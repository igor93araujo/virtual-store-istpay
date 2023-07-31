'use client'
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppProvider';
import Loading from '../loading/Loading';

function Aside() {
  const [categories, setCategories] = useState<string[]>([]);
  const context = useContext(AppContext);
  const { selectedCategory, setSelectedCategory } = context || {};

  useEffect(() => {
    const getAllCategories = async () => {
      const URL = 'https://fakestoreapi.com/products/categories';
      const response = await fetch(URL);
      const data = await response.json();
      setCategories(data);
      return data;
    };
    getAllCategories();
  }, []);

   const handleCategoryChange = (category: string) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
  };

  return (
    <aside>
      <h2>Categories</h2>
      {
       categories ? 
       <><input type="checkbox" name="all" id="all" value="all"
        checked={selectedCategory === 'all'}
        onChange={() => handleCategoryChange('all')} /><label htmlFor="all">All</label></> : <Loading />
      }
      {categories.map((category: string) => (
        <div key={category}>
          <input
            type="checkbox"
            name={category}
            id={category}
            value={category}
            checked={selectedCategory === category}
            onChange={() => handleCategoryChange(category)}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </aside>
  );
}

export default Aside;
