import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import { token } from '../../config';


const initialValues = {
    isLoading: false,
    isError: false,
    data: null,
}



const MovieSlice = createSlice({
    name: "search",
    initialState: initialValues,
    reducers: {
        fetchDataStart: state => {
            state.isLoading = true;
            state.isError = null;
        },
        fetchDataSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
    }
})



export const { fetchDataFailure, fetchDataSuccess, fetchDataStart } = MovieSlice.actions


export const MoviesSearch = (query, page = 1) => async (dispatch) => {
    dispatch(fetchDataStart());
    try {
        const params = new URLSearchParams({
            query: query,
            include_adult: false,
            language: 'en-US',
            page: page,
        });
        const url = `https://api.themoviedb.org/3/search/collection?${params}`;

        const response = await axios.get(url, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        dispatch(fetchDataSuccess(response.data));
    } catch (error) {
        dispatch(fetchDataFailure(error.message));
    }
};


export default MovieSlice.reducer;



