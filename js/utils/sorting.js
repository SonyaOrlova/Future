export const descSort = (colType, colNum) => {
  return colType === `number` ?
  (rowA, rowB) => rowA.cells[colNum].textContent - rowB.cells[colNum].textContent : 
  (rowA, rowB) => rowA.cells[colNum].textContent > rowB.cells[colNum].textContent ? 1 : -1;
};

export const ascSort = (colType, colNum) => {
  return colType === `number` ?
  (rowA, rowB) => rowB.cells[colNum].textContent - rowA.cells[colNum].textContent :
  (rowA, rowB) => rowB.cells[colNum].textContent > rowA.cells[colNum].textContent ? 1 : -1;
};
