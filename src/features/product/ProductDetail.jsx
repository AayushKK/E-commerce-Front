import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetProductQuery } from './productApi';
import { base } from '../../app/apiUrls';
import { Button, Card, CardBody, IconButton, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../cart/cartSlice';
const ProductDetail = () => {

  const { id } = useParams();


  const { data, isLoading, error } = useGetProductQuery(id);
  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.data?.message}</h1>



  return (
    <div className="grid grid-cols-3 mlg:grid-cols-3 msm:grid-cols-1 p-5 gap-5">
      {/* Image Section */}
      <Card className="mlg:col-span-1 h-full">
        <CardBody className="p-4 flex justify-center">
          <img
            src={data.image}
            alt={data.title}
            className="max-h-96 w-full object-contain"
          />
        </CardBody>
      </Card>

      {/* Product Info Section */}
      <div className="mlg:col-span-1 space-y-4">
        <Typography variant="h2" className="font-bold">
          {data.title}
        </Typography>

        <Typography variant="paragraph" className="text-gray-700">
          {data.description}
        </Typography>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Typography variant="small" color="blue-gray">
              Price:
            </Typography>
            <Typography variant="small" className="capitalize">
              {"$" + data.price}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Typography variant="small" color="blue-gray">
              Category:
            </Typography>
            <Typography variant="small" className="capitalize">
              {data.category}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Typography variant="small" color="blue-gray">
              Stock:
            </Typography>
            <Typography variant="small">
              {data.stock > 0 ? (
                <span className="text-green-500">{data.stock} available</span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </Typography>
          </div>
        </div>
      </div>


      <div>
        <CartTable product={data} />

      </div>
    </div>
  )
}

export default ProductDetail


export function CartTable({ product }) {
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);
  const cart = carts.find((cart) => cart._id === product._id);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(cart?.qty ?? 1);
  const nav = useNavigate();
  const handleAdd = () => {
    dispatch(setCart({ ...product, qty }));
    nav('/cart-page');
  }
  return (
    <Card className="flex justify-center gap-6 w-full items-center p-5">
      <div>
        <Typography variant='h5'>Product Add</Typography>
      </div>

      <div className='flex'>
        <IconButton
          disabled={qty === 1}
          onClick={() => setQty(qty - 1)}
          size='sm'><i className="fas fa-minus" /></IconButton>

        <p className='mx-4 font-bold'>{qty}</p>
        <IconButton
          disabled={qty === product.stock}
          onClick={() => setQty(qty + 1)}
          size='sm'><i className="fas fa-add" /></IconButton>
      </div>

      <div>
        <Button
          disabled={!user || user?.role === 'admin'}
          onClick={handleAdd} size='sm' className='px-5 py-2'>Add To Cart</Button>

      </div>


    </Card>
  );
}