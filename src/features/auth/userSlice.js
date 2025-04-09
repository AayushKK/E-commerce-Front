import { createSlice } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../app/local";



export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getCookie()
  },
  reducers: {
    setUserToLocal: (state, action) => {
      state.user = action.payload;
      setCookie(state.user);
    },
    removeUserFromLocal: (state, action) => {
      state.user = null;
      removeCookie();
    }
  }
});


export const { setUserToLocal, removeUserFromLocal } = userSlice.actions;