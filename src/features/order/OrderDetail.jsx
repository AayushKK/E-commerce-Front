import React from 'react'
import { useGetOrderByIdQuery } from './orderApi'
import { useParams } from 'react-router';

import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  ListItemSuffix,
} from "@material-tailwind/react";
import { base } from '../../app/apiUrls';

const OrderDetail = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useGetOrderByIdQuery(id);

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.data?.message}</h1>


  return (
    <div className='p-5 '>
      <h1 className='text-xl'>Order Detail</h1>
      <hr />
      <h1 className='mt-3'>OrderId: {data._id}</h1>

      <Card className="w-96 mt-4">
        <List>

          {data.products.map((product) => {
            const { _id, title, image, price, description } = product.productId;
            return <ListItem key={product._id}>
              <ListItemPrefix>
                <Avatar variant="circular" alt="candice" src={`${image}`} />
              </ListItemPrefix>

              <div>
                <Typography variant="h6" color="blue-gray">
                  {title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">
                  {description}
                </Typography>
              </div>
              <ListItemSuffix>

                <h1>Rs. {price}</h1>
                <p className='text-sm'>Qty:- {product.qty}</p>

              </ListItemSuffix>

            </ListItem>

          })}


        </List>
      </Card>
    </div>
  )
}

export default OrderDetail