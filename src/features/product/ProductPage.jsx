import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import ProductSearch from './ProductSearch';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';


const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ price: '', category: '' });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>
      <div className="flex justify-between items-center p-5">

        <div className="w-full sm:w-1/2 pr-2">
          <ProductSearch onSearch={setSearchTerm} />
        </div>


        <div className="w-full  sm:w-1/2 pl-2">
          <ProductFilter onFilter={setFilter} />
        </div>
      </div>
      <ProductList searchTerm={debouncedSearchTerm} filters={filter} />

    </div>

  );
};

export default ProductPage;