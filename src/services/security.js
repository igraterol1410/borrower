import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getSecurityItems = async () => {
    return await axiosInstance.get(API_URL + 'companysecurity/v2/companysecurities', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
}

export {
  getSecurityItems
}