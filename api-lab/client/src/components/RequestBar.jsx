import React from 'react';
import { Play, Save } from 'lucide-react';
import { HTTP_METHODS, getMethodColor } from '../utils/helpers';

export function RequestBar({ method, setMethod, url, setUrl, handleSend, loading, handleSave }) {
  return (
    <div className="p-4 border-b border-slate-700 bg-[#1e293b] flex items-center gap-3 shadow-sm z-10">
      <div className="flex items-center bg-slate-800 border border-slate-600 rounded-md overflow-hidden flex-1 focus-within:border-primary transition-colors focus-within:ring-1 focus-within:ring-primary">
        <select 
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={`bg-slate-800 border-none outline-none py-2 px-4 font-bold cursor-pointer hover:bg-slate-700 transition-colors ${getMethodColor(method)}`}
        >
          {HTTP_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <div className="w-px h-6 bg-slate-600 mx-1"></div>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter request URL (e.g., https://api.example.com/v1/users)"
          className="flex-1 bg-transparent border-none outline-none py-2 px-4 text-white text-sm"
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
      </div>
      
      <button 
        onClick={handleSend}
        disabled={loading}
        className={`px-6 py-2 rounded-md font-semibold text-white shadow-lg transition-all flex items-center gap-2 ${loading ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover active:scale-95'}`}
      >
        {loading ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Sending...</>
        ) : (
          <><Play size={16} fill="currentColor" /> Send</>
        )}
      </button>
      
      <button 
        onClick={handleSave}
        className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-600 transition-colors"
        title="Save Request"
      >
        <Save size={18} />
      </button>
    </div>
  );
}
