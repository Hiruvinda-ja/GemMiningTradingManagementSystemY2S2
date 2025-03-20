import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="bg-white p-10 rounded-lg shadow-lg text-center w-96">
      <h1 className="text-2xl font-bold text-gray-800">Welcome to CrystalCore</h1>
      <p className="text-gray-600 mt-2">
        Your all-in-one platform for gem mining and trading.
      </p>
      <div className="mt-6">
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
      <p className="text-gray-500 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default GetStarted;
