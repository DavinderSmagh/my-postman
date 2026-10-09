const requestService = require('../services/requestService');

exports.handleRequest = async (req, res) => {
  try {
    const { method, url, headers, params, body } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await requestService.executeRequest({
      method,
      url,
      headers,
      params,
      data: body
    });

    res.json(response);
  } catch (error) {
    console.error('Request failed:', error.message);
    res.json({ 
      error: 'Failed to execute request',
      details: error.message,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data
      } : null
    });
  }
};
