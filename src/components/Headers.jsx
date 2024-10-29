import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CartCountBadge from "../pages/CartCountBadge";

const Headers = () => {
  return (
    <header className="text-gray-400  body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/home"
          className="flex title-font font-medium items-center mb-4 md:mb-0"
        >
          <h1 className="ml-3 text-xl">Kantin Kita</h1>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Link to="/home" className="mr-5 hover:text-gray-800 cursor-pointer">
            Home
          </Link>
          <Link to="/about" className="mr-5 hover:text-gray-800 cursor-pointer">
            About
          </Link>
          <Link
            to="/contact"
            className="mr-5 hover:text-gray-800 cursor-pointer"
          >
            Contact
          </Link>
          <Link
            to="/product"
            className="mr-5 hover:text-gray-800 cursor-pointer"
          >
            Food Menu
          </Link>
        </nav>
        <div className="flex gap-4 pt-6 ">
          <Link to="/cart" className="icon__wrapper relative">
            <FiShoppingCart className="w-6 h-6 hover:text-gray-600" />
            <CartCountBadge size="w-[25px] h-[25px]" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Headers;
