export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('api_lab_history') || '[]');
  } catch (e) {
    return [];
  }
};

export const saveHistory = (req) => {
  try {
    const history = getHistory();
    const newEntry = { ...req, id: Date.now().toString(), timestamp: Date.now() };
    history.unshift(newEntry);
    if (history.length > 50) history.pop(); // limit to 50
    localStorage.setItem('api_lab_history', JSON.stringify(history));
    return history;
  } catch (e) {
    console.error("Failed to save history", e);
  }
};

export const getSaved = () => {
  try {
    return JSON.parse(localStorage.getItem('api_lab_saved') || '[]');
  } catch (e) {
    return [];
  }
};

export const saveSaved = (req, name) => {
  try {
    const saved = getSaved();
    const newEntry = { ...req, name, id: Date.now().toString() };
    saved.push(newEntry);
    localStorage.setItem('api_lab_saved', JSON.stringify(saved));
    return saved;
  } catch (e) {
    console.error("Failed to save request", e);
  }
};
