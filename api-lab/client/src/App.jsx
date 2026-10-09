import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getHistory, saveHistory, getSaved, saveSaved } from './utils/storage';
import { Sidebar } from './components/Sidebar';
import { RequestBar } from './components/RequestBar';
import { ConfigTabs } from './components/ConfigTabs';
import { ResponseViewer } from './components/ResponseViewer';

const API_PROXY_URL = import.meta.env.VITE_API_URL;

function App() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  
  const [params, setParams] = useState([{ key: '', value: '', enabled: true }]);
  const [headers, setHeaders] = useState([{ key: '', value: '', enabled: true }]);
  
  const [bodyType, setBodyType] = useState('json');
  const [body, setBody] = useState('{\n  \n}');
  
  const [authType, setAuthType] = useState('none');
  const [bearerToken, setBearerToken] = useState('');
  const [basicUser, setBasicUser] = useState('');
  const [basicPass, setBasicPass] = useState('');

  const [activeTab, setActiveTab] = useState('Params');
  const [responseTab, setResponseTab] = useState('Body');
  
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
  const [history, setHistoryList] = useState([]);
  const [saved, setSavedList] = useState([]);

  useEffect(() => {
    setHistoryList(getHistory());
    setSavedList(getSaved());
  }, []);

  const handleSend = async () => {
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }

    let parsedBody = null;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      if (bodyType === 'json' && body.trim()) {
        try {
          parsedBody = JSON.parse(body);
        } catch (e) {
          setError('Invalid JSON request body.');
          return;
        }
      } else {
        parsedBody = body; // text
      }
    }

    const activeParams = params.filter(p => p.enabled && p.key).reduce((acc, p) => ({ ...acc, [p.key]: p.value }), {});
    const activeHeaders = headers.filter(h => h.enabled && h.key).reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {});

    if (authType === 'bearer' && bearerToken) {
      activeHeaders['Authorization'] = `Bearer ${bearerToken}`;
    } else if (authType === 'basic' && (basicUser || basicPass)) {
      activeHeaders['Authorization'] = 'Basic ' + btoa(`${basicUser}:${basicPass}`);
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const requestData = {
      method,
      url,
      headers: activeHeaders,
      params: activeParams,
      body: parsedBody
    };

    try {
      const res = await axios.post(API_PROXY_URL, requestData);
      
      const resData = res.data;
      if (resData.error) {
        setError(resData.error);
        if (resData.response) {
            setResponse(resData.response);
        }
      } else {
        setResponse(resData);
        // Save to history
        const newHistory = saveHistory({
          method,
          url,
          params,
          headers,
          bodyType,
          body,
          authType,
          time: resData.responseTime,
          status: resData.status
        });
        setHistoryList(newHistory);
      }
    } catch (err) {
      if (err.message === 'Network Error') {
        setError('Unable to connect to the server. Is the backend running?');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadRequest = (req) => {
    setMethod(req.method || 'GET');
    setUrl(req.url || '');
    setParams(req.params && req.params.length > 0 ? req.params : [{ key: '', value: '', enabled: true }]);
    setHeaders(req.headers && req.headers.length > 0 ? req.headers : [{ key: '', value: '', enabled: true }]);
    setBodyType(req.bodyType || 'json');
    setBody(req.body || '{\n  \n}');
    setAuthType(req.authType || 'none');
  };

  const handleSave = () => {
    const name = prompt('Enter a name for this request:');
    if (name) {
      const newSaved = saveSaved({
        method, url, params, headers, bodyType, body, authType
      }, name);
      setSavedList(newSaved);
    }
  };

  const onNewRequest = () => {
    setMethod('GET'); 
    setUrl(''); 
    setParams([{ key: '', value: '', enabled: true }]);
    setHeaders([{ key: '', value: '', enabled: true }]); 
    setBody('{\n  \n}'); 
    setResponse(null); 
    setError(null);
  };

  // Format URL query
  useEffect(() => {
    try {
      const base = url.split('?')[0];
      if (!base) return;
      const urlObj = new URL(base.startsWith('http') ? base : `http://${base}`);
      const activeParams = params.filter(p => p.enabled && p.key);
      if (activeParams.length > 0) {
        const search = new URLSearchParams();
        activeParams.forEach(p => search.append(p.key, p.value));
        const newUrl = `${base}?${search.toString()}`;
        if (newUrl !== url) {
           // To prevent infinite loop if they type in URL
        }
      }
    } catch (e) {
      // invalid URL
    }
  }, [params, url]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f172a] text-slate-200">
      <Sidebar 
        saved={saved} 
        history={history} 
        loadRequest={loadRequest} 
        onNewRequest={onNewRequest} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <RequestBar 
          method={method} setMethod={setMethod}
          url={url} setUrl={setUrl}
          handleSend={handleSend}
          loading={loading}
          handleSave={handleSave}
        />

        <div className="flex-1 flex flex-col min-h-0">
          <ConfigTabs 
            activeTab={activeTab} setActiveTab={setActiveTab}
            params={params} setParams={setParams}
            headers={headers} setHeaders={setHeaders}
            bodyType={bodyType} setBodyType={setBodyType}
            body={body} setBody={setBody}
            authType={authType} setAuthType={setAuthType}
            bearerToken={bearerToken} setBearerToken={setBearerToken}
            basicUser={basicUser} setBasicUser={setBasicUser}
            basicPass={basicPass} setBasicPass={setBasicPass}
            method={method}
          />
          <ResponseViewer 
            responseTab={responseTab} setResponseTab={setResponseTab}
            response={response} error={error} loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
