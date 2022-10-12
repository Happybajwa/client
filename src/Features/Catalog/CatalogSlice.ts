import { RootState } from './../../App/Store/ConfigureStore';
import { stat } from 'fs';
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Agent from "../../App/Api/Agent";
import { Product } from "../../App/Models/Product";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async(_, thunkAPI) => {
        try{
            return await Agent.Catalog.list();
        }catch(error:any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async(productId, thunkAPI) => {
        try{
            return await Agent.Catalog.details(productId);
        }catch(error:any){
            console.log(error)
            return thunkAPI.rejectWithValue({error: error.data})
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
        ///loading single product

        builder.addCase(fetchProductAsync.pending,(state) =>{
            state.status='pendingFetchProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled,(state, action) =>{
            productsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        })
        builder.addCase(fetchProductAsync.rejected,(state, action) =>{
            state.status='idle';
        })
    }
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
