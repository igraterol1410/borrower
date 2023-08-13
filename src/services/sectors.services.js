import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const setSectors = async (data) => {
    return await axiosInstance.post(API_URL + 'UserCompanySector', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const deleteSectors = async (id) => {
    return await axiosInstance.delete(API_URL + `companysector/companysectors/${id}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    setSectors,
    deleteSectors
  }