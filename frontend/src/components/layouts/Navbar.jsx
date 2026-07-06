import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className='flex items-center gap-5 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3.5 px-7 sticky top-0 z-30 shadow-sm'>
      <button
        className='block lg:hidden text-gray-600 hover:text-primary transition-colors'
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu
          ? <HiOutlineX className="text-2xl" />
          : <HiOutlineMenu className='text-2xl' />}
      </button>

      <div className='flex items-center gap-2'>
        <img src="/logo.png" alt="SpendWise Logo" className='w-8 h-8 rounded-lg object-cover' />
        <h2 className='text-lg font-semibold text-gray-800'>
          Spend<span className='text-primary'>Wise</span>
        </h2>
      </div>

      {openSideMenu && (
        <div className='fixed top-[61px] left-0 -ml-0 bg-white shadow-xl z-40'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar