import { useState } from 'react';
import { Home, FolderKanban, Plus, Settings } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'work', label: 'Work Orders', icon: FolderKanban },
  { id: 'add', label: 'Add New', icon: Plus },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function SidebarNav(){
  const [active, setActive] = useState('home');
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-14 flex-col justify-between bg-gray-100 p-2 shadow-sm">
      <div className="flex flex-col items-center gap-2 pt-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            aria-label={item.label}
            className={`group relative flex h-9 w-9 items-center justify-center rounded-xl text-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${active===item.id ? 'bg-indigo-600 text-white shadow-inner' : 'bg-white text-gray-600 hover:bg-indigo-50'}`}
          >
            {(() => { const Icon = item.icon; return <Icon className="h-4 w-4" strokeWidth={1.75} />; })()}
            <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm group-hover:block group-hover:opacity-100">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2 pb-2">
        <button aria-label="Profile" className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow hover:shadow-md">
          <img alt="User" src="https://ui-avatars.com/api/?name=U&background=6366f1&color=fff&size=64" className="h-full w-full object-cover" />
        </button>
      </div>
    </aside>
  );
}
