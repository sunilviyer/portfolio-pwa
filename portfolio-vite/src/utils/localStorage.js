// File: src/utils/localStorage.js
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
};

export const loadFromLocalStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved && saved !== 'undefined') {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
  }
  return fallback;
};