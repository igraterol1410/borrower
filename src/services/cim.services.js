import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getCimInfo = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/usercompanytesorheaders?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getSegmentBreakup = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/usercompanysegmentbreakup?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getLoanInfo = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/usercompanyproductloaninfo?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getFinancialData = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimfinancedata?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getBankingArrangments = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimcurrentbankingarrangments?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getCustomerSupplier = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimcustomersupplier?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getSwotData = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimswot?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getPromotorShareholder = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimpromotorshareholders?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getComparison = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimpeercomparison?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getRating = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimratings?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getProductData = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/usercompanyproductloaninfo?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getProductDataSpecific = async (userCompanyId, userId, companyId) => {
    return await axiosInstance.get(API_URL + `cim/usercompanyproductloaninfo?usercompanyid=${userCompanyId}&userid=${userId}&companyid=${companyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getSecurityData = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `usercompanysecurity/usercompanysecuritybyusercompanyid?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getHealthcheckData = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `cim/getusercompanycimhealthcheck?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
 
  const getSecurityDataByUSer = async (userCompanyId) => {
    return await axiosInstance.get(API_URL + `usercompanysecurity/usercompanysecuritybyusercompanyid?usercompanyid=${userCompanyId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    getCimInfo,
    getSegmentBreakup,
    getLoanInfo,
    getFinancialData,
    getBankingArrangments,
    getCustomerSupplier,
    getSwotData,
    getPromotorShareholder,
    getComparison,
    getRating,
    getProductData,
    getSecurityData,
    getHealthcheckData,
    getSecurityDataByUSer,
    getProductDataSpecific
  }