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
  <div className="flex flex-col msm:flex-row justify-between items-center gap-4 p-5">
    <div className="w-full msm:flex-1">
      <ProductSearch onSearch={setSearchTerm} />
    </div>
    <div className="w-full msm:flex-1">
      <ProductFilter onFilter={setFilter} />
    </div>
  </div>
  <ProductList searchTerm={debouncedSearchTerm} filters={filter} />
</div>

  );
};

export default ProductPage;
