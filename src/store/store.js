import { configureStore } from '@reduxjs/toolkit';
import productEditReducer from '../state/productEditSlice';

export default configureStore({
  reducer: {
      productEdit: productEditReducer,
  },
})