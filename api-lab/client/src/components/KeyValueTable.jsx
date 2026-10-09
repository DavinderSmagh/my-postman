import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function KeyValueTable({ items, setItems, title }) {
  const addRow = () => setItems([...items, { key: '', value: '', enabled: true }]);
  const updateRow = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };
  const toggleRow = (index) => {
    const newItems = [...items];
    newItems[index].enabled = !newItems[index].enabled;
    setItems(newItems);
  };
  const removeRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="flex flex-col text-sm">
      <div className="flex font-semibold text-gray-400 border-b border-slate-700 pb-2 mb-2">
        <div className="w-8"></div>
        <div className="flex-1 px-2">Key</div>
        <div className="flex-1 px-2">Value</div>
        <div className="w-10"></div>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center mb-2 group">
          <div className="w-8 flex justify-center">
            <input 
              type="checkbox" 
              checked={item.enabled} 
              onChange={() => toggleRow(i)} 
              className="w-4 h-4 rounded border-gray-600 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-gray-900"
            />
          </div>
          <div className="flex-1 px-2">
            <input 
              type="text" 
              value={item.key} 
              onChange={(e) => updateRow(i, 'key', e.target.value)} 
              placeholder="Key"
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 focus:outline-none focus:border-primary transition-colors text-white"
            />
          </div>
          <div className="flex-1 px-2">
            <input 
              type="text" 
              value={item.value} 
              onChange={(e) => updateRow(i, 'value', e.target.value)} 
              placeholder="Value"
              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 focus:outline-none focus:border-primary transition-colors text-white"
            />
          </div>
          <div className="w-10 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => removeRow(i)} className="text-gray-400 hover:text-danger">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
      <button 
        onClick={addRow}
        className="mt-2 text-primary hover:text-primary-hover flex items-center gap-1 text-sm font-medium w-fit transition-colors"
      >
        <Plus size={16} /> Add {title}
      </button>
    </div>
  );
}
