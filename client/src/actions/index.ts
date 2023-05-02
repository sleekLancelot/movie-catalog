import axios from 'axios'
import { baseURL } from '../constant'

export const api = axios.create({
    baseURL,
});