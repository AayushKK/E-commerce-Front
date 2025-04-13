import React, { useState } from 'react';
import { Input, Option, Select } from '@material-tailwind/react';

const ProductFilter = ({ onFilter }) => {

  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleCategoryChange = (value) => {
    setCategory(value);
    onFilter((prev) => ({ ...prev, category: value }));
  };



  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    onFilter((prev) => ({ ...prev, price: e.target.value }));
  };

  return (
    <div className="grid grid-cols-2 gap-4 mlg:grid-cols-2 msm:grid-cols-1 p-5">
      <div className="w-full mmd:w-1/2">
        <Select label="Category" value={category} onChange={handleCategoryChange} className="w-full">
          <Option value="">All</Option>
          <Option value="electronics">Electronics</Option>
          <Option value="jewelery">Jewlery</Option>
          <Option value="other">Others</Option>
        </Select>
      </div>

      <div className="w-full m2xl:w-1/2 mxl:w-1/2 mlg:w-1/2 mmd:w-full msm:w-full">
        <Input
          type="number"
          label="Price Less Than"
          value={price}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>

    </div>
  );
};

export default ProductFilter;
