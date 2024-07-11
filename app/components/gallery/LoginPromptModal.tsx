import React from "react";
import Link from "next/link";

const LoginPromptModal = ({ open, handleClose }: any) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-sky-800">
          You must be logged in to like this image.
        </h2>
        <Link href="/auth/login">
          <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </div>
        </Link>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginPromptModal;
