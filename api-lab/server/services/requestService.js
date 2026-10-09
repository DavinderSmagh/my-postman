const axios = require('axios');

exports.executeRequest = async (config) => {
  const startTime = Date.now();
  
  try {
    const response = await axios({
      method: config.method || 'GET',
      url: config.url,
      headers: config.headers || {},
      params: config.params || {},
      data: config.data,
      timeout: 10000 // 10 seconds timeout
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: response.data,
      responseTime
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        body: error.response.data,
        responseTime
      };
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server (Timeout or Network Error)');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};
