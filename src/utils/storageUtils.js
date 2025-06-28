export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addItem = (key, item) => {
  const existing = getData(key);
  existing.push(item);
  setData(key, existing);
};
