import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react"; // You can use react-icons or SVG as fallback

const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          User Access
        </Link>

        {/* Hamburger for small screens */}
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex space-x-6 items-center">
          {!token && (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/" className="hover:underline">
                Home
              </Link>

              {role === "Admin" && (
                <Link to="/create-software" className="hover:underline">
                  Create Software
                </Link>
              )}

              {role === "Employee" && (
                <>
                  <Link to="/request-access" className="hover:underline">
                    Request Access
                  </Link>
                  <Link to="/my-requests" className="hover:underline">
                    My Requests
                  </Link>
                </>
              )}

              {role === "Manager" && (
                <Link to="/pending-requests" className="hover:underline">
                  Pending Requests
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-blue-700 px-4 pb-4 space-y-3">
          {!token && (
            <>
              <Link to="/login" className="block hover:underline">
                Login
              </Link>
              <Link to="/signup" className="block hover:underline">
                Signup
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to="/" className="block hover:underline">
                Home
              </Link>

              {role === "Admin" && (
                <Link to="/create-software" className="block hover:underline">
                  Create Software
                </Link>
              )}

              {role === "Employee" && (
                <>
                  <Link to="/request-access" className="block hover:underline">
                    Request Access
                  </Link>
                  <Link to="/my-requests" className="block hover:underline">
                    My Requests
                  </Link>
                </>
              )}

              {role === "Manager" && (
                <Link to="/pending-requests" className="block hover:underline">
                  Pending Requests
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-left text-white mt-2">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
