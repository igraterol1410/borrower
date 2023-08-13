import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getNotifications = async (userId) => {
    return await axiosInstance.get(API_URL + `notification/notifications?userId=${userId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const excludeNotifications = async (userId, data) => {
    return await axiosInstance.post(API_URL + `notification/excludenotifications?userId=${userId}`, data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

export {
  getNotifications,
  excludeNotifications
}