import React from "react";
import { Link } from "react-router-dom";
import GetStarted from "../components/GetStartC";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GetStartedPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <GetStarted />
      </div>
      <Footer />
    </div>
  );
};

export default GetStartedPage;
