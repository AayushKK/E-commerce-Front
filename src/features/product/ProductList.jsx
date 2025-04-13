// import React from 'react'
// import { useGetProductsQuery } from './productApi'
// import { ProductCard } from './ProductCard';
// import { Typography } from '@material-tailwind/react';

// const ProductList = ({ searchTerm }) => {

//   const { data, isLoading, error } = useGetProductsQuery({
//     search: searchTerm
//   });

//   if (isLoading) return <h1>Loading...</h1>
//   if (error) return <h1>{error.data?.message}</h1>
//   return (
//     <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {data?.products?.length ? (
//         data.products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))
//       ) : (
//         <div className="col-span-full text-center py-10">
//           <Typography variant="h5" color="gray">
//             No products available
//           </Typography>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ProductList

import React from 'react';
import { useGetProductsQuery } from './productApi';
import { ProductCard } from './ProductCard';
import { Typography } from '@material-tailwind/react';

const ProductList = ({ searchTerm, filters }) => {
  const queryParams = {
    search: searchTerm,
  };

  if (filters?.price) {
    queryParams['price[lte]'] = filters.price;
  }


  if (filters?.category) {
    queryParams.category = filters.category;
  }




  const { data, isLoading, error } = useGetProductsQuery(queryParams);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.data?.message || "Something went wrong."}</h1>;

  return (
    <div className="grid grid-cols-4 msm:grid-cols-1 mmd:grid-cols-2 mlg:grid-cols-3 gap-6">
      {data?.products?.length ? (
        data.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center py-10">
          <Typography variant="h5" color="gray">
            No products available
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProductList;
