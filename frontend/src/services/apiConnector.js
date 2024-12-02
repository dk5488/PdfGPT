import axios from "axios";



const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://submission-sarayu-backend.onrender.com/api/v1', 
  headers: {
    'Content-Type': 'application/json', 
}});


export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
    try {
      // Determine Content-Type based on bodyData type
      const contentType = bodyData instanceof FormData 
        ? 'multipart/form-data' 
        : 'application/json';
  
      const config = {
        method,
        url,
        data: bodyData || null,
        headers: {
          ...headers,
          'Content-Type': contentType,
        },
        params,
      };
  
      console.log("Final request config:", config);
  
      const response = await axiosInstance(config);
      return response.data;
    } catch (error) {
      console.error('Error making request:', error.response || error.message);
      throw error;
    }
  };
