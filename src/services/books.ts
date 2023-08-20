import axios from './config';
import { BASE_URL } from './config';


const url: string | undefined = BASE_URL;

export const RETREIVE_BOOKS = async (query: string = '') => {
    return axios.get(`${url}/books/allbooks/${query}`);
};

export const CREATE_BOOK = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/books/addbook`, data);
};

export const UPDATE_BOOK = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/books/updatebook/${id}`, data);
};
export const DELETE_BOOK = async (id: string) => {
    return axios.delete(`${url}/books/deletebook/${id}`);
};