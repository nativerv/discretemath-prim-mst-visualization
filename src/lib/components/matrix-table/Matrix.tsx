import { noop } from 'lodash';
import './matrix.scss';

interface IMatrixProps {
  matrix: number[][];
  onEditCell?: (ij: [number, number], newValue: string) => void;
  onAddRow?: () => void;
  onAddCol?: () => void;
}

export function Matrix({
  matrix,
  onEditCell = noop,
  onAddRow = noop,
  onAddCol = noop,
}: IMatrixProps) {
  function makeHandleChange(ij: [number, number]) {
    return function handleKeyPress(e: React.ChangeEvent<HTMLInputElement>) {
      onEditCell(ij, e.currentTarget.value);
    };
  }

  return (
    <div className="matrix">
      {matrix.map((row, i) => (
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
      <div className="matrix__controls">
        <div className="matrix__controls-row">
          <button className="matrix__add-row">+</button>
          <button className="matrix__rem-row">-</button>
        </div>
        <div className="matrix__controls-col">
          <button className="matrix__add-col">+</button>
          <button className="matrix__rem-col">-</button>
        </div>
      </div>
    </div>
  );
}
