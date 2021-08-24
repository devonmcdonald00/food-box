import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'productEdit',
    initialState: {
        name: "",
        price: 0,
        description: "",
        cuisine: "",
        enabled: 0,
        imageurl: ""
    },
    reducers: {
        enable_disable: (state) => {
            state.enabled = !state.enabled;
        },
        change_name: (state, action) => {
            state.name = action.payload;
        },
        change_price: (state, action) => {
            state.price = action.payload;
        },
        change_description: (state, action) => {
            state.description = action.payload;
        },
        change_cuisine: (state, action) => {
            state.cuisine = action.payload;
        },
        change_imageurl: (state, action) => {
            state.imageurl = action.payload;
        }
    }
})

export const { enable_disable, change_name, change_cuisine, change_price, change_description, change_imageurl } = productSlice.actions

export default productSlice.reducer