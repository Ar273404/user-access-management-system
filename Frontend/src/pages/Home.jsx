import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { role, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Optional: redirect immediately to role specific page if desired
    // For example:
    /*
    if (role === 'Admin') navigate('/create-software');
    else if (role === 'Manager') navigate('/pending-requests');
    else if (role === 'Employee') navigate('/request-access');
    */
  }, [role, token, navigate]);

  if (!token) return null; // or loading indicator

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to User Access Management System
      </h1>

      <div className="text-center text-gray-700 mb-8">
        {role === "Admin" && (
          <>
            <p className="mb-2">
              You are logged in as <strong>Admin</strong>.
            </p>
            <Link
              to="/create-software"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
              Create New Software
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Manage software and access levels.
            </p>
          </>
        )}

        {role === "Manager" && (
          <>
            <p className="mb-2">
              You are logged in as <strong>Manager</strong>.
            </p>
            <Link
              to="/pending-requests"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
              View Pending Access Requests
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Approve or reject software access requests.
            </p>
          </>
        )}

        {role === "Employee" && (
          <>
            <p className="mb-2">
              You are logged in as <strong>Employee</strong>.
            </p>
            <Link
              to="/request-access"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition">
              Request Software Access
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Submit requests to access software.
            </p>
          </>
        )}
      </div>

      <p className="text-center text-gray-500 text-sm">
        Use the navigation bar to explore other pages.
      </p>
    </div>
  );
};

export default Home;
