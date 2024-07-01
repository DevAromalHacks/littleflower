"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const supabase = createClientComponentClient();

export default function LogOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("hasLoggedIn");
    router.push("/auth/login");
    toast.success("SignOut Successfully");
  };
  return (
    <section className="bg-white p-8 w-full max-w-md mx-auto rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        Are you sure you want to log out?
      </h1>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-red-500 text-white rounded-md px-6 py-2 hover:bg-red-600 transition duration-200"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
        <button
          className="bg-gray-500 text-white rounded-md px-6 py-2 hover:bg-gray-600 transition duration-200"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
