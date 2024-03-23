import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex justify-end space-x-12 mx-10">
        <li>
          <a href="/" className="text-white hover:text-gray-300">Home</a>
        </li>
        <li>
          <a href="/login" className="text-white hover:text-gray-300">Login</a>
        </li>
        <li>
          <a href="/register" className="text-white hover:text-gray-300">Sign in</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
