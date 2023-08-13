import axios from 'axios'

import authHeader from '../auth-header';
const API_URL = import.meta.env.VITE_BE_API;

const axiosInstance = axios.create({
    API_URL,
    authHeader
});

axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
        if (err.response.status === 401) {
            window.localStorage.removeItem('user')
            // console.log(err.response)
            window.location.replace(`${window.location.origin}/dashboard`)
            // window.location.reload()
        }
      return Promise.reject(err)
    }
  )

export default axiosInstance;