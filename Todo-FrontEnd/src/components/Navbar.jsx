import { useState } from "react";
import { MdQrCodeScanner } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="flex items-center gap-2 text-purple-500 text-2xl font-bold">
            <SiTicktick />
            <span>TaskFlow</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-lg">
            <button className="text-pink-500 hover:underline transition cursor-pointer">
              Sign In
            </button>

            <button
              className="flex items-center gap-2 px-4 py-1 rounded text-white 
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:from-purple-600 hover:to-pink-600 transition"
            >
              <MdQrCodeScanner size={20} />
              <span>Open App</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white shadow-md">
          <button className="text-pink-500 hover:underline transition text-left">
            Sign In
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 w-38 rounded text-white 
                       bg-gradient-to-r from-purple-500 to-pink-500 
                       hover:from-purple-600 hover:to-pink-600 transition"
          >
            <MdQrCodeScanner size={20} />
            <span>Open App</span>
          </button>
        </div>
      )}
    </nav>
  );
};
