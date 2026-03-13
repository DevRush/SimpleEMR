import type { ReactNode } from 'react';
import { Button } from './Button';

interface ModalProps {
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger';
}

export function Modal({ title, children, onConfirm, onCancel, confirmLabel = 'Confirm', confirmVariant = 'primary' }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full mx-4 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="text-sm text-gray-600 mb-6">{children}</div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
