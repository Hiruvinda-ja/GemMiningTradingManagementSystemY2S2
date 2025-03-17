import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-6">
      <div className="max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GMTMS</h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage your gem mining and trading seamlessly with our all-in-one platform.
        </p>
        
        <div className="flex space-x-4 justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
