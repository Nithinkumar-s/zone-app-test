import Navbar from './Navbar.jsx';
import SidebarNav from './SidebarNav.jsx';

export default function Layout({children}){
  return (
    <div className="min-h-screen bg-[#040924] text-gray-100">
      <SidebarNav />
      <Navbar />
      <div className="pl-14 pt-11">{/* offsets: sidebar width (w-14) + navbar height (h-11) */}
        <main>{children}</main>
      </div>
    </div>
  )
}