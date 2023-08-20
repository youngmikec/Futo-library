import axios from "./config";
import { BASE_URL } from "./config";

const url: string | undefined = BASE_URL;

export const RETREIVE_BOOKREQUESTS = async (query: string = "") => {
  return axios.get(`${url}/transactions/all-transactions/${query}`);
};

export const CREATE_BOOKREQUEST = async (data: {[key: string]: any}) => {
  return axios.post(`${url}/transactions/add-transaction`, data);
};

export const UPDATE_BOOKREQUEST = async (id: string, data: {[key: string]: any}) => {
  return axios.put(`${url}/transactions/update-transaction/${id}`, data);
};
export const DELETE_BOOKREQUEST = async (id: string) => {
  return axios.delete(`${url}/transactions/delete-transaction/${id}`);
};
