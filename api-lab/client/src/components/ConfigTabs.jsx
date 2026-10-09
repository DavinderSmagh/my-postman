import React from 'react';
import { KeyValueTable } from './KeyValueTable';

export function ConfigTabs({
  activeTab, setActiveTab,
  params, setParams,
  headers, setHeaders,
  bodyType, setBodyType,
  body, setBody,
  authType, setAuthType,
  bearerToken, setBearerToken,
  basicUser, setBasicUser,
  basicPass, setBasicPass,
  method
}) {
  return (
    <div className="flex-1 flex flex-col border-b border-slate-700 min-h-0 bg-[#0f172a]">
      {/* Tabs Header */}
      <div className="flex px-4 border-b border-slate-800">
        {['Params', 'Headers', 'Body', 'Auth'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'}`}
          >
            {tab}
            {tab === 'Params' && params.filter(p => p.key && p.enabled).length > 0 && <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-full">{params.filter(p => p.key && p.enabled).length}</span>}
            {tab === 'Headers' && headers.filter(h => h.key && h.enabled).length > 0 && <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-full">{headers.filter(h => h.key && h.enabled).length}</span>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'Params' && (
          <KeyValueTable items={params} setItems={setParams} title="Query Param" />
        )}
        
        {activeTab === 'Headers' && (
          <KeyValueTable items={headers} setItems={setHeaders} title="Header" />
        )}
        
        {activeTab === 'Body' && (
          <div className="flex flex-col h-full">
            {!['POST', 'PUT', 'PATCH'].includes(method) ? (
              <div className="text-slate-500 text-sm flex items-center justify-center h-full italic">
                {method} requests typically do not have a body.
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-3">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="radio" checked={bodyType === 'json'} onChange={() => setBodyType('json')} className="accent-primary" />
                    JSON
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input type="radio" checked={bodyType === 'text'} onChange={() => setBodyType('text')} className="accent-primary" />
                    Raw Text
                  </label>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-md p-4 text-sm font-mono text-green-400 focus:outline-none focus:border-primary resize-none transition-colors"
                  spellCheck="false"
                ></textarea>
              </>
            )}
          </div>
        )}
        
        {activeTab === 'Auth' && (
          <div className="flex flex-col h-full max-w-2xl">
            <select 
              value={authType} 
              onChange={(e) => setAuthType(e.target.value)}
              className="w-full max-w-xs bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary mb-6"
            >
              <option value="none">No Auth</option>
              <option value="bearer">Bearer Token</option>
              <option value="basic">Basic Auth</option>
            </select>

            {authType === 'bearer' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Token</label>
                <input 
                  type="text" 
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  placeholder="eyJhbG..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            )}

            {authType === 'basic' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Username</label>
                  <input 
                    type="text" 
                    value={basicUser}
                    onChange={(e) => setBasicUser(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Password</label>
                  <input 
                    type="password" 
                    value={basicPass}
                    onChange={(e) => setBasicPass(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}
            
            {authType === 'none' && (
              <div className="text-slate-500 text-sm italic">
                This request does not use any authorization.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
