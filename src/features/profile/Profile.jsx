import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';
import OrderList from '../order/OrderList';



const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);


  return (
    <div className='p-4 grid grid-cols-3 gap-10'>


      <ProfileForm user={user} />

      <OrderList user={user} />


    </div>
  )
}

export default Profile