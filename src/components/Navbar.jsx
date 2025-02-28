import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-row gap-8 justify-center bg-gray-900 p-4 shadow-md">
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-white font-semibold px-4 py-2 rounded-lg transition-colors 
          ${isActive ? 'bg-blue-600' : 'hover:bg-blue-500 hover:text-white'}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `text-white font-semibold px-4 py-2 rounded-lg transition-colors 
          ${isActive ? 'bg-blue-600' : 'hover:bg-blue-500 hover:text-white'}`
        }
      >
        Pastes
      </NavLink>

    </div>
  );
};

export default Navbar;
