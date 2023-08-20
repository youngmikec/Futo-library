import axios from "./config";
import { BASE_URL } from "./config";

const url: string | undefined = BASE_URL;

export const RETREIVE_BOOKREQUESTS = async (query: string = "") => {
  return axios.get(`${url}/transactions/all-transactions/${query}`);
};
