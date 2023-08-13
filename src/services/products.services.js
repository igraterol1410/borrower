import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getLoanTypes = async () => {
    return await axiosInstance.get(API_URL + 'loantype/loantypes', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getLoansubtypes = async (loanTypeId) => {
    return await axiosInstance.get(API_URL + `loansubtype/getloancategorybyloantype?loantype=${loanTypeId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getLoansubtypeSecurity = async (loanTypeId, userCompanyId) => {
    return await axiosInstance.get(API_URL + `usercompanysecurity/usercompanysecurity/${loanTypeId}/${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const postCompanyProduct = async (data) => {
    return await axiosInstance.post(API_URL + 'usercompanyproduct', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      return {data: {error:true, message:'Sorry! Product information was not saved, please try again.'}}
    })
  }

  const deleteCompanyProduct = async (id) => {
    return await axiosInstance.delete(API_URL + `usercompanyproduct/usercompanyproduct/${id}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      return {data: {error:true, message:'The product could not be removed, try again later.'}}
    })
  }

  const updatePricingAsk = async (data) => {
    return await axiosInstance.post(API_URL + 'usercompanyproduct/updatepricingpercentpriceask', data,{headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      return {data: {error:true, message:'Sorry! Pricing ask information was not saved, please try again.'}}
    })
  }
  
  const postCompanySecurity = async (data) => {
    return await axiosInstance.post(API_URL + 'usercompanysecurity', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      return {data: {error:true, message:'Sorry! Security information was not saved, please try again.'}}
    })
  }

  const deleteCompanySecurity = async (loanTypeId, userCompanyId) => {
    return await axiosInstance.delete(API_URL + `usercompanysecurity/deleteusercompanysecuritybyloantype?loantypeid=${loanTypeId}&usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const deleteCompanyPaymentFrequency = async (loansubtypeid, userCompanyId) => {
    return await axiosInstance.delete(API_URL + `usercompanypaymentfrequency/deleteusercompanyfrequencybyloansubtype?loansubtypeid=${loansubtypeid}&usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const postCompanyVPO = async (data) => {
    return await axiosInstance.post(API_URL + 'usercompanypaymentfrequency/userpaymentfrequency', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      return {data: {error:true, message:'Sorry! Payment frequency information was not saved, please try again.'}}
    })
  }

  export {
    getLoanTypes,
    getLoansubtypes,
    getLoansubtypeSecurity,
    postCompanyProduct,
    deleteCompanyProduct,
    postCompanySecurity,
    postCompanyVPO,
    deleteCompanySecurity,
    deleteCompanyPaymentFrequency,
    updatePricingAsk
  }