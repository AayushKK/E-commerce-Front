import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import ProductSearch from './ProductSearch';
import ProductList from './ProductList';


const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div>

      <ProductSearch onSearch={setSearchTerm} />
      <ProductList searchTerm={debouncedSearchTerm} />

    </div>

  );
};

export default ProductPage;