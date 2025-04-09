import React from 'react'
import { useParams } from 'react-router'
import { useGetProductQuery } from '../product/productApi';
import ProductEditForm from './ProductEditForm';


const ProductEdit = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductQuery(id);
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>{error.data?.message}</h1>
  }

  return (
    <div>
      {data && <ProductEditForm product={data} />}

    </div>
  )
}

export default ProductEdit