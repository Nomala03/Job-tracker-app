import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="max-w-[max-width] mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 py-4 flex justify-between items-center relative">
      <Link to="/" className="text-xl font-bold px-4">
        Job-Jotter
      </Link>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/home" className="hover:underline text-white text-xl">
          Home
        </Link>
        <Link to="/add-job" className="hover:underline text-white text-xl">
          Add Job
        </Link>
        <button
          onClick={handleLogout}
          className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
      {/* Hamburger button - visible on small screens */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-md shadow-lg flex flex-col p-4 space-y-4 md:hidden z-20">
          <Link
            to="/home"
            className="hover:underline text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/add-job"
            className="hover:underline text-white text-lg"
            onClick={() => setIsOpen(false)}
          >
            Add Job
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-gray-200 transition text-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
