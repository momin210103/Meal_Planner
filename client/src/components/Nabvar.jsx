import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaShopify } from "react-icons/fa";
import { FaBars,FaTimes } from "react-icons/fa";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/services", label: "Services" },
];
const NavItems = ({toggle}) => {
  return (
    <ul className="flex flex-col md:flex-row items-center md:space-x-8 gap-8">
      {navItems.map((item, index) => (
        <li key={index} onClick={toggle}>
          <NavLink
            to={item.path}
            className={({ isActive}) =>
            isActive ? "text-amber-500 " : "hover:text-amber-500 hover:border-2 border-green-500"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Nabvar = () => {
    const [menuOpen,SetMenuOpen] = useState(false);

    const toggle=()=>{
        SetMenuOpen(prevState => !prevState);

    }
  return (
    <header className="bg-[#F5F5F5] shadow-2xl">
      <nav className="max-w-screen-2xl container mx-auto flex justify-between items-center py-6">
        <Link to="/" className="font-bold">
          Logo
        </Link>

        {/* humberg menu */}
        <div onClick ={toggle} className="md:hidden text-xl cursor-pointer">
        {
            menuOpen ? null : <FaBars />
        }
        </div>
        {/* Dekstop menu */}
        <div className="hidden md:flex">
          <NavItems></NavItems>
        </div>

        {/* mobile menu */}
        <div className={`fixed top-0 left-0 w-full h-screen bg-black/80 flex flex-col items-center justify-center space-y-8 text-white transition-transform transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
            <div className="absolute top-4 right-4 text-xl cursor-pointer" onClick={toggle}>
            <FaTimes />
            </div>
            <NavItems toggle ={toggle}/>
        </div>
        

        <div className="hidden md:block cursor-pointer">
        <FaShopify />
        </div>
      </nav>
    </header>
  );
};

export default Nabvar;
