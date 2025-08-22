import { useState, useRef, useEffect } from 'react';

export const Badge = ({ children, color = 'gray', className = '' }) => {
  const colorMap = {
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200'
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${colorMap[color] || colorMap.gray} ${className}`}>{children}</span>;
};

export const Button = ({ variant='primary', size='md', className='', children, ...rest }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-3.5 py-2',
    lg: 'text-sm px-4 py-2.5'
  };
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-indigo-500',
    ghost: 'text-gray-600 hover:bg-gray-100 focus-visible:ring-indigo-500',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500'
  };
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>{children}</button>;
};

export const IconButton = ({ label, children, className='', ...rest }) => (
  <button aria-label={label} title={label} className={`p-2 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`} {...rest}>{children}</button>
);

export const Modal = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-xl ring-1 ring-black/5">
        <div className="flex items-start justify-between border-b px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          <IconButton label="Close" onClick={onClose}>✕</IconButton>
        </div>
        <div className="px-5 py-4 text-sm text-gray-700 max-h-[50vh] overflow-auto">{children}</div>
        {actions && <div className="flex justify-end gap-2 border-t px-5 py-3 bg-gray-50">{actions}</div>}
      </div>
    </div>
  );
};

export const Tooltip = ({ content, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && <span role="tooltip" className="pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-[11px] font-medium text-white shadow-lg">{content}</span>}
    </span>
  );
};

export const TextInput = ({ label, className='', ...rest }) => (
  <label className={`flex flex-col gap-1 text-xs font-medium text-gray-600 ${className}`}>
    <span>{label}</span>
    <input className="rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...rest} />
  </label>
);

export const TextArea = ({ label, className='', rows=4, ...rest }) => (
  <label className={`flex flex-col gap-1 text-xs font-medium text-gray-600 ${className}`}>
    <span>{label}</span>
    <textarea rows={rows} className="resize-y rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...rest} />
  </label>
);
