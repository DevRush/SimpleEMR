import { useState, type ReactNode } from 'react';

interface CollapsibleProps {
  title: string;
  badge?: string | number;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function Collapsible({ title, badge, defaultOpen = false, children }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900">{title}</span>
          {badge !== undefined && (
            <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 py-3 border-t border-gray-100">{children}</div>}
    </div>
  );
}
