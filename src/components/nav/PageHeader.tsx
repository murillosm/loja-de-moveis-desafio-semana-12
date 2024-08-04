import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import bg from '../../assets/bg.jpeg';
import logo from '../../assets/logo.png';

interface PageHeaderProps {
  title: string;
  currentPath: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, currentPath }) => {
  return (
    <div className="w-full h-[316px] flex items-center justify-center">
      <img
        className="w-full h-full left-0 top-0 blur-[6px] object-cover object-center"
        src={bg}
      />
      <div className="absolute flex flex-col justify-center text-center items-center">
        <img src={logo} alt="Logo" className="p-3" />
        <div className="p-2 flex items-center justify-center text-black text-5xl font-medium font-poppins">
          {title}
        </div>
        <div className="flex items-center justify-center gap-1">
          <NavLink
            to="/"
            className="text-black text-base font-medium font-poppins p-1"
          >
            Home
          </NavLink>
          <MdKeyboardArrowRight size={24} />
          <NavLink
            to={currentPath}
            className="text-black text-base font-light font-poppins p-1"
          >
            {title}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;