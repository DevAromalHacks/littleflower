import React, { useState } from "react";

interface AdminAuthProps {
  handleAuth: (event: React.FormEvent<HTMLFormElement>, name: string, secretKey: string) => void;
}

export default function AdminAuth({ handleAuth }: AdminAuthProps) {
  const [adminName, setAdminName] = useState("");
  const [secretKey, setSecretKey] = useState("");

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <form
          onSubmit={(e) => handleAuth(e, adminName, secretKey)}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label
              htmlFor="secret-key"
              className="block text-sm font-medium text-gray-300"
            >
              Secret Key
            </label>
            <input
              id="secret-key"
              name="secret-key"
              type="text"
              required
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Secret Key"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
