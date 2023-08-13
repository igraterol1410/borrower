import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getUserInfo = async () => {
    return await axiosInstance.get(API_URL + 'users/usersinfo', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getCompanyId = async (userId) => {
    return await axiosInstance.get(API_URL + `usercompany/usercompanies/filter?userid=${userId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getUserCompanyInfo = async (userCompanyId, userId, companyId) => {
    return await axiosInstance.get(API_URL + `usercompany/userinfo?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getUserStatuses = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `status/getstepsstatus?statustypeId=347EF57E-2EA1-40D2-924E-C45C678A3B72&userCompanyId=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const postLendersActions = async (userCompanyId, actionId) => {
    return await axiosInstance.post(API_URL + `usercompanyaction?usercompanyid=${userCompanyId}&actionid=${actionId}`, {}, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getLenderActions = async () => {
    return await axiosInstance.get(API_URL + 'usercompanyaction/actions', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const addUser = async (payload) => {
    return await axiosInstance.post(API_URL + 'users/adduser', payload, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      return error
    })
  }

  const getUsersByUser = async (userId) => {
    return await axiosInstance.get(API_URL + `users/filters?userParentId=${userId}&_LoginType=Borrower`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getCasemanagerInfo = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `usercompany/casemanager?userCompanyId=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

export {
  getUserInfo,
  getCompanyId,
  getUserCompanyInfo,
  getUserStatuses,
  getLenderActions,
  postLendersActions,
  addUser,
  getUsersByUser,
  getCasemanagerInfo
}