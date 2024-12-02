import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { set } from "../state/tokenReducer.js"; 

const Navbar = ({ onPDFUpload }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onPDFUpload(file); 
    }
  };

  const handleLogout = () => {
    // Remove token from Redux store
    dispatch(set(null));
    // Remove token from local storage
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="bg-blue-600 text-white flex items-center justify-between p-4">
      <h1 className="text-lg font-bold">LLM PDF Q&A</h1>

      {/* If token exists, show Upload PDF and Logout button */}
      {token ? (
        <div className="flex items-center space-x-4">
          <label
            htmlFor="upload-pdf"
            className="flex items-center bg-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-800"
          >
            Upload PDF
            <input
              type="file"
              id="upload-pdf"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded cursor-pointer hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        // If no token, show Login and Signup buttons
        <div className="flex items-center space-x-4">
          <NavLink
            to="/login"
            className="bg-green-600 px-4 py-2 rounded cursor-pointer hover:bg-green-700"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="bg-yellow-600 px-4 py-2 rounded cursor-pointer hover:bg-yellow-700"
          >
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
