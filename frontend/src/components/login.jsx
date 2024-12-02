import React, { useState } from "react";
import { apiConnector } from "../services/apiConnector.js";
import { Link, useNavigate } from "react-router-dom";
import { set } from "../state/tokenReducer.js";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiConnector("POST", "/auth/login", { email,password });

      console.log("Response-----------", response);
      if (response.success === false) {
        alert("User not found");
        navigate("/login");
        return;
      }

      if (response) {
        localStorage.setItem("authToken", response.token);
        dispatch(set(response.token));
        setEmail("");
        setPassword("");
        setError(null);

        
      } else {
        throw new Error("Backend login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-pink-400">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="block text-center mt-4 text-orange-500 hover:underline"
          >
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
