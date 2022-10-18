import { PageData } from './../../App/Models/pagination';
import { ProductParams } from './../../App/Models/Product';
import { RootState } from './../../App/Store/ConfigureStore';
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Agent from "../../App/Api/Agent";
import { Product} from "../../App/Models/Product";


interface CatalogState {
    productsLoaded:boolean;
    filtersLoaded:boolean;
    status:string;
    gender:string[];
    size:string[];
    ProductParams:ProductParams;
    pageData:PageData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams:ProductParams)
{
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);

    if(productParams.searchBy) 
        params.append('searchBy', productParams.searchBy);
    if(productParams.size) 
        params.append('size', productParams.size.toString());
    if(productParams.gender) 
        params.append('gender', productParams.gender.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state:RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.ProductParams);
        try {
            const response = await Agent.Catalog.list(params);
            thunkAPI.dispatch(setPageData(response.pageData));
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await Agent.Catalog.details(productId);
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchFilterAsync = createAsyncThunk(
    'catalog/fetchFilterAsync',
    async (_, thunkAPI) => {
        try {
            return await Agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

function initParams()
{
    return {
        pageNumber:1,
        pageSize:6,
        orderBy:'name'
    }
}

export const catalogSlice = createSlice({
    name: 'slice',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        gender: [],
        size: [],
        ProductParams: initParams(),
        pageData: null
    }),
    reducers: {
        setProductParams:(state, action) => {
            state.productsLoaded = false;
            state.ProductParams = {...state.ProductParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber:(state,action) =>{
            state.productsLoaded = false;
            state.ProductParams = {...state.ProductParams, ...action.payload};
        },
        setPageData:(state, action) => {
            state.pageData = action.payload;
        },
        resetProductParams: (state) => {
            state.ProductParams = initParams();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        })
        ///loading single product

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
        //Loading Filters
        builder.addCase(fetchFilterAsync.pending, (state) => {
            state.status = 'pendingFetchFilters';
        })
        builder.addCase(fetchFilterAsync.fulfilled, (state, action) => {
            state.gender = action.payload.gender;
            state.size = action.payload.size;
            state.filtersLoaded = true;
        })
        builder.addCase(fetchFilterAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload)
        })
    }
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const {setProductParams, resetProductParams, setPageData, setPageNumber} = catalogSlice.actions;
