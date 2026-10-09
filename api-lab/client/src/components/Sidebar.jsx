import React from 'react';
import { Plus, Bookmark, History } from 'lucide-react';
import { getMethodColor } from '../utils/helpers';

export function Sidebar({ saved, history, loadRequest, onNewRequest }) {
  return (
    <div className="w-72 flex-shrink-0 bg-[#1e293b] border-r border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
          AL
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">API Lab</h1>
      </div>
      
      <div className="p-4">
        <button 
          onClick={onNewRequest}
          className="w-full bg-primary hover:bg-primary-hover text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 font-medium transition-all shadow-md active:scale-95"
        >
          <Plus size={18} /> New Request
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-6 custom-scrollbar">
        {/* Saved Requests */}
        <div>
          <div className="flex items-center gap-2 px-2 text-slate-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Bookmark size={14} /> Saved Requests
          </div>
          {saved.length === 0 ? (
            <div className="px-4 py-2 text-sm text-slate-500 italic">No saved requests</div>
          ) : (
            <div className="space-y-1">
              {saved.map((req, i) => (
                <button 
                  key={i} 
                  onClick={() => loadRequest(req)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-700 transition-colors flex flex-col"
                >
                  <span className="text-sm font-medium text-slate-200 truncate">{req.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold ${getMethodColor(req.method)}`}>{req.method}</span>
                    <span className="text-xs text-slate-400 truncate">{req.url}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* History */}
        <div>
          <div className="flex items-center gap-2 px-2 text-slate-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <History size={14} /> History
          </div>
          {history.length === 0 ? (
            <div className="px-4 py-2 text-sm text-slate-500 italic">No history yet</div>
          ) : (
            <div className="space-y-1">
              {history.map((req, i) => (
                <button 
                  key={i} 
                  onClick={() => loadRequest(req)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-3"
                >
                  <span className={`text-xs font-bold w-12 ${getMethodColor(req.method)}`}>{req.method}</span>
                  <span className="text-xs text-slate-300 truncate flex-1">{req.url}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
