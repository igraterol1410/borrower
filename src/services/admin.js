import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getBorrowers = async () => {
    return await axiosInstance.get(API_URL + 'users/Borrowers', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

export {
  getBorrowers
}