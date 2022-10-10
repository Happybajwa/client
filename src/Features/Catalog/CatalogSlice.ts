import { stat } from 'fs';
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Agent from "../../App/Api/Agent";
import { Product } from "../../App/Models/Product";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async() => {
        try{
            return await Agent.Catalog.list();
        }catch(error){
            
        }
    }
)

export const catalogSlice = createSlice({
    name:'slice',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) =>{
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) =>{
            state.status = 'idle';
        })
    }
})

export const productSelectors