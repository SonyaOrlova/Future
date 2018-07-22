export const descSort = (type, key) => {
  return type === `number` ?
  (a, b) => a[key] - b[key] : 
  (a, b) => a[key] > b[key] ? 1 : -1;
};

export const ascSort = (type, key) => {
  return type === `number` ?
  (a, b) => b[key] - a[key] : 
  (a, b) => b[key] > a[key] ? 1 : -1;
};
