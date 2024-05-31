import React from "react";

function Modal({ children }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 border-2 border-gray-700">
      <div className="bg-white p-8 rounded-lg w-96">
        {children}
      </div>
    </div>
  );
}

export default Modal;
