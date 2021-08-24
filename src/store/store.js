import { configureStore } from '@reduxjs/toolkit';
import productEditReducer from '../state/productEditSlice';
import userReducer from '../state/userSlice';

export default configureStore({
  reducer: {
      productEdit: productEditReducer,
      user: userReducer
  },
})