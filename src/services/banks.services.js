import axios from 'axios'
import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getBanks = async () => {
    return await axiosInstance.get(API_URL + 'bank/banks', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const getFilterBanks = async (BankName) => {
    return await axios.get(API_URL + `bank/banks/filter?bankname=${BankName}`, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const postBanks = async (data) => {
    return await axios.post(API_URL + 'usercompanypreference', data, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getLenderAction = async (userCompanyId) => {
    return await axios.get(API_URL + `/usercompanyaction/getusercompanylenderactions?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    getBanks,
    getFilterBanks,
    postBanks,
    getLenderAction
  }