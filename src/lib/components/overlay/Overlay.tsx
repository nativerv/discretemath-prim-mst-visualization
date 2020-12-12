import { noop } from 'lodash';
import './overlay.scss';

interface IOverlayProps {
  children: React.ReactNode;
  minimized?: boolean;
  title?: React.ReactNode;
  onToggle?: () => void;
}

export function Overlay({
  children,
  minimized = false,
  title = 'Actions',
  onToggle = noop,
}: IOverlayProps) {
  return (
    <div className="overlay">
      <div className="overlay__title-container">
        {title}
        <div
          className={`overlay__toggle ${minimized ? '' : 'reversed'}`}
          onClick={onToggle}
        >
          ^
        </div>
      </div>
      {!minimized && (
        <div className="overlay__content-container">{children}</div>
      )}
    </div>
  );
}
