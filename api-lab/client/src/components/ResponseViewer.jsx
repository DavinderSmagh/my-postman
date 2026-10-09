import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { getStatusColor, formatSize, getResponseSize, formatJson } from '../utils/helpers';

export function ResponseViewer({ responseTab, setResponseTab, response, error, loading }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#1e293b]">
      {/* Response Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-800/50">
        <div className="flex gap-4">
          {['Body', 'Headers'].map(tab => (
            <button
              key={tab}
              onClick={() => setResponseTab(tab)}
              className={`text-sm font-medium transition-colors ${responseTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-6 text-xs text-slate-300">
          {response && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium uppercase">Status:</span>
                <span className={`font-bold flex items-center gap-1 ${getStatusColor(response.status)}`}>
                  {response.status >= 200 && response.status < 300 ? <Check size={14} /> : <AlertCircle size={14} />}
                  {response.status} {response.statusText}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium uppercase">Time:</span>
                <span className="font-medium flex items-center gap-1"><Clock size={12} className="text-slate-400" /> {response.responseTime} ms</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium uppercase">Size:</span>
                <span className="font-medium">{formatSize(getResponseSize(response))}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Response Content */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar relative">
        {error && !response && (
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="bg-danger/10 border border-danger/20 rounded-lg p-6 max-w-md text-center">
              <AlertCircle className="w-12 h-12 text-danger mx-auto mb-4" />
              <h3 className="text-lg font-bold text-danger mb-2">Request Failed</h3>
              <p className="text-sm text-danger/80">{error}</p>
            </div>
          </div>
        )}

        {!response && !error && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <div className="w-24 h-24 mb-6 opacity-20 relative">
              <div className="absolute inset-0 border-4 border-current rounded-xl rotate-12"></div>
              <div className="absolute inset-0 border-4 border-current rounded-xl -rotate-6"></div>
            </div>
            <p className="text-lg font-medium">Enter a URL and click Send to get a response</p>
          </div>
        )}

        {loading && (
          <div className="h-full flex items-center justify-center text-primary">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <span className="text-sm font-medium animate-pulse">Loading response...</span>
            </div>
          </div>
        )}

        {response && (
          <div className="h-full">
            {responseTab === 'Body' && (
              <div className="h-full rounded-md border border-slate-700 bg-slate-900 overflow-hidden">
                <pre className="p-4 h-full overflow-auto text-sm font-mono text-emerald-400 leading-relaxed custom-scrollbar select-text">
                  {formatJson(response.body)}
                </pre>
              </div>
            )}
            {responseTab === 'Headers' && (
              <div className="rounded-md border border-slate-700 bg-slate-900 overflow-hidden text-sm">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {Object.entries(response.headers || {}).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-slate-800/50' : 'bg-transparent'}>
                        <td className="px-4 py-2 font-mono font-medium text-slate-300 border-r border-slate-700/50 w-1/3 break-all">{key}</td>
                        <td className="px-4 py-2 font-mono text-emerald-300 break-all">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
