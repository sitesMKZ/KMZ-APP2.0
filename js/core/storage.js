export const getDB = (key) => JSON.parse(localStorage.getItem(key)) || [];
export const saveDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));
export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

