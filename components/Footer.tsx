import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white p-6 h-[10%]">
      {/* Copyright Notice */}
      <div className="text-center  border-gray-800">
        <p>
          &copy; {new Date().getFullYear()} Shopping Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
