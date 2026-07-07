import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100 flex flex-col sticky top-[61px] z-20 shadow-sm'>

      {/* User Profile Section */}
      <div className='flex flex-col items-center justify-center gap-3 px-5 py-7 border-b border-gray-100'>
        <div className='relative'>
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl || ""}
              alt='Profile Image'
              className='w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20'
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-16"
              height="h-16"
              style="text-lg rounded-2xl ring-2 ring-primary/20"
            />
          )}
          <span className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full'></span>
        </div>
        <div className='text-center'>
          <h5 className='text-sm font-semibold text-gray-800 leading-tight'>
            {user?.fullName || ""}
          </h5>
          <p className='text-xs text-gray-400 mt-0.5'>{user?.email || ""}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className='flex-1 px-4 py-4 space-y-1 overflow-y-auto'>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-sm font-medium py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
              activeMenu === item.label
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-lg flex-shrink-0 ${activeMenu === item.label ? 'text-white' : 'text-gray-400'}`} />
            {item.label}
            {activeMenu === item.label && (
              <span className='ml-auto w-1.5 h-1.5 rounded-full bg-white/70'></span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className='px-5 py-4 border-t border-gray-100'>
        <p className='text-[10px] text-gray-300 text-center'>SpendWise v1.0</p>
      </div>
    </div>
  );
};

export default SideMenu;