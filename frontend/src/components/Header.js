import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">CrystalCore</h1>
      <nav>
        <Link to="/" className="mx-2 hover:underline">
          Home
        </Link>
        <Link to="/about" className="mx-2 hover:underline">
          About
        </Link>
        <Link to="/contact" className="mx-2 hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
