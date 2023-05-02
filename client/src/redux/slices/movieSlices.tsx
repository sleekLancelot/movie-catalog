import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

import { RootState } from '../store';
import { FetchStatus, MovieProp, Status } from '../../constant'
import { api } from '@source/actions';

interface MoviesProp {
    data: MovieProp[]
    total: 0,
    currentPage: 0,
    last_page: 0
}

interface InitialStateProp {
    movies: MoviesProp
    moviesStatus: Status
    moviesError: string

    genres: Array<string>
    genresStatus: Status
    genresError: string

}

const initialState: InitialStateProp = {
    movies: {
        data: [],
        total: 0,
        currentPage: 0,
        last_page: 0,
    },
    moviesStatus: FetchStatus.IDLE,
    moviesError: '',

    genres: [],
    genresStatus: FetchStatus.IDLE,
    genresError: '',
}

// Fetch movies
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
        const axiosResponse: any = await api.get('/movies?page=1&limit=10');

        console.log(axiosResponse, 'from movies')

        if (axiosResponse?.data) {
            const response = axiosResponse.data;
            const movies = response.data;

            if (Array.isArray(movies)) {
                return fulfillWithValue( response )
            } else {
                return fulfillWithValue( [] )
            }
        
        } else {
            return rejectWithValue( axiosResponse?.response?.data?.message || axiosResponse?.message )
        }
    } catch (err: any) {
        console.log('from movie func', err)
        return rejectWithValue( err?.response ||  err?.toString() )
    }
  });
  
  // Fetch genres
  export const fetchGenres = createAsyncThunk('genres/fetchGenres', async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
        const axiosResponse: any = await api.get('movies/genres');

        console.log(axiosResponse, 'from genres')

        if (axiosResponse?.data) {
            const genres = axiosResponse.data;

            if (Array.isArray(genres) && !!genres?.length) {
                return fulfillWithValue( genres )
            } else {
                return fulfillWithValue( [] )
            }
        
        } else {
            return rejectWithValue( axiosResponse?.response?.data?.message || axiosResponse?.message )
        }
    } catch (err: any) {
        console.log('from genre func', err)
        return rejectWithValue( err?.response ||  err?.toString() )
    }
  });

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload
        },
        setGenres: (state, action) => {
            state.genres = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase( fetchMovies.pending, ( state) => {
            state.moviesStatus = FetchStatus.PENDING
            state.moviesError = ''
        })
        .addCase( fetchMovies.fulfilled, (state, action: PayloadAction<MoviesProp>) => {
            state.movies.data = action.payload?.data
            state.movies.total = action.payload?.total
            state.movies.currentPage = action.payload?.currentPage
            state.movies.last_page = action.payload?.last_page
            state.moviesStatus = FetchStatus.RESOLVED
            state.moviesError = ''
        } )
        .addCase( fetchMovies.rejected, (state, action: PayloadAction<any>) => {
            state.moviesStatus = FetchStatus.REJECTED
            state.moviesError = action.payload?.data?.message as string
        } )
        .addCase( fetchGenres.pending, ( state) => {
            state.genresStatus = FetchStatus.PENDING
            state.genresError = ''
        })
        .addCase( fetchGenres.fulfilled, (state, action) => {
            state.genres = action.payload
            state.genresStatus = FetchStatus.RESOLVED
            state.genresError = ''
        } )
        .addCase( fetchGenres.rejected, (state, action: PayloadAction<any>) => {
            state.genresStatus = FetchStatus.REJECTED
            state.genresError = action.payload?.data?.message as string
        } )
    },
})

export const movieSelector = ( state: RootState ) => state.movie;

export const {setMovies, setGenres} = movieSlice.actions

export const movieReducer = movieSlice.reducer