import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://submission-sarayu-backend.onrender.com/api/v1', 
  headers: {
    'Content-Type': 'application/json', 
}});


export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  console.log("request reached to axios ",url)
  try {
    const response = await axiosInstance({
      method: method,     
      url: url,           
      data: bodyData || null,  
      headers: {          
        ...headers,
      },
      params: {           
        ...params,
      },
    });

    
    console.log("Response from Axios:", response);
    return response.data;  
  } catch (error) {
    
    console.error('Error making request from axios:', error.response || error.message);
    
   
    throw error; 
  }
};
