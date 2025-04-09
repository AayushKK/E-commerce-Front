import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrls";

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/orders` }),
  endpoints: (builder) => ({

    getOrders: builder.query({
      query: (token) => ({
        url: '/',
        headers: {
          Authorization: token
        },
        method: 'GET'
      }),
      providesTags: ['Order'],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: ['Order'],
    }),

    getUserOrders: builder.query({
      query: (q) => ({
        url: `/users/${q.id}`,
        headers: {
          Authorization: q.token
        },
        method: 'GET'
      }),
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation({
      query: (q) => ({
        url: '/',
        body: q.body,
        headers: {
          Authorization: q.token
        },
        method: 'POST'
      }),
      invalidatesTags: ['Order']
    })



  }),
})

export const { useGetOrdersQuery, useCreateOrderMutation, useGetUserOrdersQuery, useGetOrderByIdQuery } = orderApi;