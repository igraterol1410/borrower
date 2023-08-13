import axios from 'axios'
import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getDocuments = async () => {
    return await axiosInstance.get(API_URL + 'document/documents', {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const getKYCDocuments = async (industryId, subindustryId, documentTypeID) => {
    return await axiosInstance.get(API_URL + `attachment/documentuploadconfiguration?industryID=${industryId}&subIndustryID=${subindustryId}&documentTypeID=${documentTypeID}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const getKYCUploadedDocuments = async (userCompanyID, documentTypeID) => {
    return await axiosInstance.get(API_URL + `attachment/attachments?userCompanyMapID=${userCompanyID}&docTypeID=${documentTypeID}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const uploadDocuments = async (data) => {
    return await axiosInstance.post(API_URL + 'attachment', data, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const downloadDocuments = async (documentId) => {
    return await axios.get(API_URL + `attachment/attachments/${documentId}`, {headers:authHeader(), responseType:"blob"})
    .then(data => {
      console.log(data)
      return data
    }).catch(error => {
      console.log(error)
    })
  }
  
  const deleteDocuments = async (documentId) => {
    return await axiosInstance.delete(API_URL + `attachment/attachments/${documentId}`, {headers:authHeader()})
    .then(data => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    getDocuments,
    getKYCDocuments,
    uploadDocuments,
    getKYCUploadedDocuments,
    downloadDocuments,
    deleteDocuments
  }