"use client";

import { useState } from "react";
import { setToken, setUser } from "@/redux/auth/auth.slice";
import useAuthSession from "../hooks/useAuthSession";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  
  // state for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  const handleLogin = async () => {
    try {
      // Validate the form
      if (username.length < 1 || password.length < 6) {
        toast.error("Please enter valid credentials");
        return;
      }

      // Make the request
      const response = await axios.post(
        "/api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Get the data
      const data = await response.data;

      // Set the token and user
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

      // Reset the form
      setUsername("");
      setPassword("");

      // Show success message
      toast.success(data.message);
    } catch (error: any) {
      // Show error message
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-[#000]">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#000]">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border text-[#000] rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              placeholder="Password (min 6 characters)"
              className="w-full px-4 py-2 mt-4 border text-[#000] rounded-md"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default HomePage;
