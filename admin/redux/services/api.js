import axios from "axios";
import { apibasePath } from "../../config";

//axios instance

export const apiRequest = axios.create({
  baseURL: apibasePath,
  headers: {
    // Accept: 'application/json',
    // Authorization: `Bearer ${getToken()}`,
  },
});

