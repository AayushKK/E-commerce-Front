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
  <div className="flex flex-col gap-4 p-5">
    <div className="w-full">
      <ProductSearch onSearch={setSearchTerm} />
    </div>
    <div className="w-full msm:flex msm:flex-row msm:gap-4">
      {/* This will show filter normally on mobile, but wrap it in a flex on desktop */}
      <div className="w-full">
        <ProductFilter onFilter={setFilter} />
      </div>
    </div>
  </div>
  <ProductList searchTerm={debouncedSearchTerm} filters={filter} />
</div>

  );
};

export default ProductPage;
