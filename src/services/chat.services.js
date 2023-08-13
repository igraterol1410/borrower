import axios from 'axios'
import axiosInstance from './interceptor/axiosInstance'
import authHeader from './auth-header'
const API_URL = import.meta.env.VITE_BE_API

const getMessages = async (headerId, pageNumber) => {
    return await axiosInstance.get(API_URL + `chat/messages?messageHeaderId=${headerId}&pageNumber=${pageNumber}`, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

const getHeadersId = async (participantId1,participantId2) => {
    return await axios.get(API_URL + `chat/getmessageheaderid?participantId1=${participantId1}&participantId2=${participantId2}`, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  const postMessage = async (data) => {
    return await axios.post(API_URL + 'chat', data, {headers:authHeader()})
    .then(({data}) => {
      return data
    }).catch(error => {
      console.log(error)
    })
  }

  export {
    getMessages,
    getHeadersId,
    postMessage
  }