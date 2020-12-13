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
  function makeHandleKeyPress(ij: [number, number]) {
    return function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
        onEditCell(ij, e.currentTarget.value);
      }
    };
  }

  return (
    <div className="matrix">
      {matrix.map((row, i) => (
        <div className="matrix__row" key={i}>
          {row.map((cell, j) => (
            <input
              className="matrix__cell"
              key={`${i},${j}`}
              type="text"
              defaultValue={cell}
              onKeyPress={makeHandleKeyPress([i, j])}
            />
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
