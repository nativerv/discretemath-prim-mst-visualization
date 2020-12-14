import { noop } from 'lodash';
import './matrix.scss';

interface IMatrixProps {
  matrix: number[][];
  onEditCell?: (ij: [number, number], newValue: string) => void;
  onAddRow?: () => void;
  onAddCol?: () => void;
  onRemoveRow?: () => void;
  onRemoveCol?: () => void;
}

export function Matrix({
  matrix,
  onEditCell = noop,
  onAddRow = noop,
  onAddCol = noop,
  onRemoveRow = noop,
  onRemoveCol = noop,
}: IMatrixProps) {
  function makeHandleChange(ij: [number, number]) {
    return function handleKeyPress(e: React.ChangeEvent<HTMLInputElement>) {
      onEditCell(ij, e.currentTarget.value);
    };
  }

  return (
    <div className="matrix">
      {matrix[0].length === 0
        ? '∅'
        : matrix.map((row, i) => (
            <div className="matrix__row">
              {row.map((cell, j) => (
                <div className="matrix__cell-container">
                  <input
                    className="matrix__cell"
                    type="text"
                    value={cell}
                    onChange={makeHandleChange([i, j])}
                  />
                  <div className="matrix__index">
                    {i + 1},{j + 1}
                  </div>
                </div>
              ))}
            </div>
          ))}
      {/* <div className="matrix__controls">
        <div className="matrix__controls-row">
          <button className="matrix__add-row" onClick={onAddRow}>+</button>
          <button className="matrix__rem-row" onClick={onRemoveRow}>-</button>
        </div>
        <div className="matrix__controls-col">
          <button className="matrix__add-col" onClick={onAddCol}>+</button>
          <button className="matrix__rem-col" onClick={onRemoveCol}>-</button>
        </div>
      </div> */}
    </div>
  );
}
