import { Search, Bell } from 'lucide-react';

export default function Navbar(){
  return (
    <nav className="fixed left-0 top-0 z-30 flex h-11 w-full items-center gap-4 border-b border-[#0b0f2e] bg-[#02083a] pl-14 pr-4 text-[13px] text-gray-200">{/* pl for sidebar offset */}
      <div className="flex items-center font-semibold tracking-tight text-sky-300">
        <span className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded bg-sky-500 text-[10px] font-bold text-white">Z</span>
        zLink
      </div>
      <div className="mx-auto hidden w-full max-w-xl items-center sm:flex">
        <div className="flex w-full items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 focus-within:ring-sky-400/40">
          <Search className="h-4 w-4 text-gray-400" strokeWidth={1.75} />
          <input aria-label="Search" placeholder="Search" className="w-full bg-transparent text-xs text-gray-100 placeholder-gray-400 focus:outline-none" />
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-gray-300">⌘ K</kbd>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button aria-label="Notifications" className="rounded-full border border-white/10 p-1.5 text-gray-300 transition hover:bg-white/10">
          <Bell className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-white px-2 pr-3 text-xs font-medium text-gray-800">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">C</span>
          Accutron Inc.
        </div>
        <img alt="User avatar" src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=48" className="h-8 w-8 rounded-full border border-white/10 object-cover" />
      </div>
    </nav>
  )
}
