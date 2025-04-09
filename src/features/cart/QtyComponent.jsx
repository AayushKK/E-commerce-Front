import { IconButton } from '@material-tailwind/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setCart } from './cartSlice';

const QtyComponent = ({ cart }) => {


  const dispatch = useDispatch();

  const handleChange = (isAdd) => {
    if (isAdd) {
      dispatch(setCart({ ...cart, qty: cart.qty + 1 }));
    } else {
      dispatch(setCart({ ...cart, qty: cart.qty - 1 }));
    }


  }
  return (

    <div className='flex'>
      <IconButton
        disabled={cart.qty === 1}
        onClick={() => handleChange(false)}
        size='sm'><i className="fas fa-minus" /></IconButton>

      <p className='mx-4 font-bold'>{cart.qty}</p>
      <IconButton
        onClick={() => handleChange(true)}
        size='sm'><i className="fas fa-add" /></IconButton>
    </div>

  )
}

export default QtyComponent