import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';
import OrderList from '../order/OrderList';



const Profile = () => {
  const { user } = useSelector((state) => state.userSlice);


  return (
    <div className="grid grid-cols-3 mlg:grid-cols-3 msm:grid-cols-1 p-5 gap-5">


      <ProfileForm user={user} />

      <OrderList user={user} />


    </div>
  )
}

export default Profile