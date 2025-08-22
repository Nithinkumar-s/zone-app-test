import Navbar from './Navbar.jsx';

export default function Layout({children}){
  return (
    <div className="min-h-screen bg-[#040924] text-gray-100">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}