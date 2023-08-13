import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getIndustries = async () => {
    return await axiosInstance.get(API_URL + 'industry/industries', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const getIndustriesByName = async (industryName) => {
    return await axiosInstance.get(API_URL + `industry/industries/filter?name=${industryName}`, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getSubIndustries = async () => {
    return await axiosInstance.get(API_URL + 'subindustry/subindustries', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getSubIndustriesById = async (industryId) => {
    return await axiosInstance.get(API_URL + `subindustry/industry?industry=${industryId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getCompanySector = async () => {
    return await axiosInstance.get(API_URL + 'companysector/companysectors', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const saveIndustry = async (data) => {
    return await axiosInstance.put(API_URL + 'usercompany/updateusercompanyindustry', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    getIndustries,
    getSubIndustries,
    getCompanySector,
    getIndustriesByName,
    getSubIndustriesById,
    saveIndustry
  }