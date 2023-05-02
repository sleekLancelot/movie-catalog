import axios from 'axios'
import { MovieProp, baseURL } from '../constant'
import { buildQueryString } from '@source/utils';

export const api = axios.create({
    baseURL,
});

const defaultParams = {
    page: 1,
    limit: 10,
    order: 'ASC',
}

const config = {
    'Content-Type': 'application/json'
}

export const createMovie = async (body: Omit<MovieProp, 'id'>) => {
    const axiosResponse: any = await api.post(`/movies`, body, {headers: config});

    return axiosResponse; 
}

export const getMovies = async (params: {
    page?: number
    limit?: number
    order?: 'ASC' | 'DESC'
    title?: string
    genre?: string
}) => {
    const queryString = buildQueryString( {
        ...defaultParams,
        ...params,
    } )

    const axiosResponse: any = await api.get(`/movies?${ queryString || '' }`);

    return axiosResponse;
}

export const get_a_Movie = async (id: number) => {
    const axiosResponse: any = await api.get(`/movies/details/${id}`);

    return axiosResponse;
}

export const getGenres = async () => {
    const axiosResponse: any = await api.get(`/movies/genres`);

    return axiosResponse;
}