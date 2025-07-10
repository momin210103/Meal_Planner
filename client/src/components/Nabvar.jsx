import React, { useState } from "react";
import { Link, NavLink } from "react-router"; // Corrected import
import { FaShopify, FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/Logo.png'

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/login", label: "Login" },
];

const NavItems = ({ toggle }) => {
  return (
    <ul className="flex flex-col md:flex-row items-center md:space-x-8 gap-8">
      {navItems.map((item, index) => (
        <li key={index} onClick={toggle}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 font-semibold"
                : "text-white hover:text-amber-500 transition-colors duration-300"
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className=" fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-lg rounded-2xl">
      <nav className="max-w-screen-2xl container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="font-bold text-2xl text-white">
          <img src={logo} alt="MealPlanner Logo" className="h-15 w-15 rounded-full hover:scale-105 transition-transform"/>
        </Link>
        

        {/* Hamburger menu */}
        <div onClick={toggle} className="md:hidden text-xl cursor-pointer text-white">
          {menuOpen ? null : <FaBars />}
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavItems />
          <div className="cursor-pointer text-white hover:text-amber-500 transition-colors duration-300">
            <FaShopify className="text-2xl" />
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-gray-900/95 flex flex-col items-center justify-center space-y-8 text-white transition-transform transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="absolute top-6 right-6 text-xl cursor-pointer" onClick={toggle}>
            <FaTimes />
          </div>
          <NavItems toggle={toggle} />
          <div className="cursor-pointer text-white hover:text-amber-500 transition-colors duration-300">
            <FaShopify className="text-2xl" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;