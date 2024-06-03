import axios from 'axios'
import { KEY_ACCESS_TOKEN, getItem } from './localStorageManagement';



export const axiosClient = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
  });


  axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
     request.headers['Authorization'] = `Bearer ${accessToken}`
     return request
    }
    )

