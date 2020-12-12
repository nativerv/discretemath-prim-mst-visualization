import { noop } from 'lodash';
import './modal.scss';

interface IModalProps {
  children: React.ReactNode;
  visible?: boolean;
  onClose?: () => void;
}

export function Modal({
  children,
  visible = false,
  onClose = noop,
}: IModalProps) {
  return visible ? (
    <div className="modal">
      {children}
      <div className="modal__close" onClick={onClose}>
        ×
      </div>
    </div>
  ) : (
    <></>
  );
}
