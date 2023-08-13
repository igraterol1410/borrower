import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const saveTerms = async (data) => {
    return await axiosInstance.post(API_URL + 'termsheet', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const getTerms = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `termsheet?userCompanyId=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const getTermsSecurity = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `usercompanysecurity/usercompanysecuritybyusercompanyid?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getTermsSecurity2 = async (userCompanyId) => {
    return await axiosInstance.get(`https://ibankeys-dev.azurewebsites.net/usercompanysecurity/usercompanysecuritybyusercompanyid?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    saveTerms,
    getTerms,
    getTermsSecurity,
    getTermsSecurity2
  }