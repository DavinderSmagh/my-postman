export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const getMethodColor = (m) => {
  switch(m) {
    case 'GET': return 'text-success';
    case 'POST': return 'text-warning';
    case 'PUT': return 'text-blue-400';
    case 'PATCH': return 'text-purple-400';
    case 'DELETE': return 'text-danger';
    default: return 'text-white';
  }
};

export const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return 'text-success';
  if (status >= 300 && status < 400) return 'text-blue-400';
  if (status >= 400 && status < 500) return 'text-warning';
  if (status >= 500) return 'text-danger';
  return 'text-gray-400';
};

export const formatSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatJson = (data) => {
  if (typeof data === 'string') {
    try {
      const obj = JSON.parse(data);
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return data;
    }
  }
  return JSON.stringify(data, null, 2);
};

export const getResponseSize = (response) => {
  if (!response) return 0;
  const bodyStr = typeof response.body === 'string' ? response.body : JSON.stringify(response.body);
  const bodySize = new Blob([bodyStr]).size;
  const headersSize = new Blob([JSON.stringify(response.headers)]).size;
  return bodySize + headersSize;
};
