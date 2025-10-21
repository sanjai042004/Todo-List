import React from "react";
import { FaWhatsapp, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="py-8 text-center border-t border-gray-300 bg-white text-gray-700">
      
      {/* Social Links */}
      <div className="flex justify-center flex-wrap gap-4 mb-6">
        <a
          href="https://wa.me/8124384309"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-600 hover:text-pink-500 hover:scale-105 transform transition-all duration-200"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        <a
          href="https://www.instagram.com/thalapathy__sanjai/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-600 hover:text-pink-500 hover:scale-105 transform transition-all duration-200"
        >
          <FaInstagram /> Instagram
        </a>
        <a
          href="https://github.com/sanjai042004"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-purple-600 hover:text-pink-500 hover:scale-105 transform transition-all duration-200"
        >
          <FaGithub /> GitHub
        </a>
      </div>

      {/* Legal & Copyright */}
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-gray-500 border-t border-gray-300 pt-4">
        <span>
          © 2025 <span className="font-semibold text-purple-600">TaskFlow</span>. All rights reserved.
        </span>

        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <a
            href="/terms"
            className="hover:text-gray-700 hover:underline transition-colors"
          >
            Terms & Conditions
          </a>
          <a
            href="/privacy"
            className="hover:text-gray-700 hover:underline transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
