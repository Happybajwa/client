import { FieldValues } from 'react-hook-form';
import { createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from "../../App/Models/User";
import Agent from '../../App/Api/Agent';
import { history } from '../..';
import { setBasket } from '../Basket/BasketSlice';

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    '/account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await Agent.Account.login(data);
            const {basket, ...user} = userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    '/account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await Agent.Account.currentUser();
            const {basket, ...user} = userDto;
            if(basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut:(state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('./login')
        },
        setUser:(state, action)=>{
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected,(state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/catalog');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
            (state, action) => {
                state.user = action.payload
            });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected),
            (state, action) => {
                throw action.payload;
            });
    })
})

export const {signOut, setUser} = accountSlice.actions;