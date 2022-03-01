import _ from 'lodash';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default () => {
  const initValue = _.shuffle(values);
  const defaultRowIndex = 3;
  const defaultColIndex = 3;
  let currentPosition = {
    rowIndex: defaultRowIndex,
    columnIndex: defaultColIndex,
  };

  const root = document.querySelector('.gem-puzzle');
  const board = document.createElement('table');
  board.className = 'table-bordered';
  board.classList.add('display-4');
  root.append(board);

  for (let r = 0; r < 4; r += 1) {
    const row = board.insertRow();
    for (let c = 0; c < 4; c += 1) {
      const cell = row.insertCell();
      cell.className = 'p-2';
      if (r === defaultRowIndex && c === defaultColIndex) {
        cell.classList.add('table-active');
        cell.textContent = ' ';
      }
      cell.textContent = initValue[r + c * 4];
    }
  }

  document.addEventListener('keyup', (e) => {
    let newPosition;
    const { rowIndex, columnIndex } = currentPosition;

    switch (e.key) {
      case 'ArrowUp':
        newPosition = { ...currentPosition, rowIndex: rowIndex + 1 };
        break;
      case 'ArrowDown':
        newPosition = { ...currentPosition, rowIndex: rowIndex - 1 };
        break;
      case 'ArrowLeft':
        newPosition = { ...currentPosition, columnIndex: columnIndex + 1 };
        break;
      case 'ArrowRight':
        newPosition = { ...currentPosition, columnIndex: columnIndex - 1 };
        break;
      default:
        break;
    }

    const row = board.rows.item(newPosition.rowIndex);
    if (row) {
      const cell = row.cells.item(newPosition.columnIndex);
      if (cell) {
        const active = board.rows.item(rowIndex)
          .cells.item(columnIndex);
        active.textContent = cell.textContent;
        active.classList.remove('table-active');
        cell.textContent = '';
        cell.classList.add('table-active');
        currentPosition = newPosition;
      }
    }
  });
};
