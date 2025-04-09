import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";

import QtyComponent from './QtyComponent';
import { removeCart, singleRemoveCart } from './cartSlice';
import { useCreateOrderMutation } from '../order/orderApi';
import { toast } from 'react-toastify';

const TABLE_HEAD = ["Item", "Price", "Quantity", "Total"];

const CartPage = () => {
  const [addOrder, { isLoading }] = useCreateOrderMutation();
  const { carts } = useSelector(state => state.cartSlice);
  const { user } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const totalAmount = carts.reduce((acc, item) => acc + item.price * item.qty, 0);


  const handleOrder = async () => {
    try {
      await addOrder({
        token: user.token,
        body: {
          totalAmount,
          products: carts.map((cart) => ({
            productId: cart._id,
            qty: cart.qty
          }))
        }

      }).unwrap();
      dispatch(removeCart());
      toast.success('Order Placed Successfully');
    } catch (err) {
      toast.error(err.data?.message);
      console.log(err);
      console.log(user);
    }
  }


  return (
    <div className='px-20 pt-7'>

      {carts.length === 0 ? <div className='text-center text-2xl font-bold'>No Product Added</div> :

        <div className=''>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {carts.map((cart, index) => {
                  const isLast = index === carts.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className='flex items-center gap-4'>
                          <div>
                            <img className='h-[90px] w-[90px] object-cover' src={`${cart.image}`} alt="" />
                          </div>
                          <p>{cart.title}</p>

                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {cart.price}
                        </Typography>
                      </td>
                      <td className={classes}>

                        <QtyComponent cart={cart} />

                      </td>
                      <td className={classes}>
                        <div className='flex items-center gap-4'>
                          <p>   {`Rs. ${cart.price * cart.qty}`}</p>
                          <IconButton
                            onClick={() => dispatch(singleRemoveCart(index))}
                            variant='outlined'
                            className='rounded-full'
                            size='sm'><i className="fas fa-close" /></IconButton>
                        </div>

                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <div className='flex justify-end mt-5 text-2xl font-bold'>Total Amount: Rs. {totalAmount}</div>
          <div className='flex justify-end'>
            <Button
              onClick={handleOrder}
              loading={isLoading}
              className='mt-5 ' >Place Order</Button>
          </div>

        </div>
      }


    </div>
  )
}

export default CartPage