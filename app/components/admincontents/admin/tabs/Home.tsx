"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Dashboard() {
  const [name, setName] = useState("User");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState(
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  );
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserName = async () => {
      const secretKey = localStorage.getItem("secretKey");
      if (!secretKey) return;

      const { data, error } = await supabase
        .from("Admin")
        .select("admin_name")
        .eq("secret_key", secretKey)
        .single();

      if (error) {
        console.error("Error fetching user name:", error);
      } else if (data) {
        setName(data.admin_name);
      }
    };

    fetchUserName();
  }, [supabase]);

  useEffect(() => {
    const getCurrentGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Good morning";
      } else if (currentHour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };

    setGreeting(getCurrentGreeting());
    const timer = setInterval(() => {
      setGreeting(getCurrentGreeting());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const firstLetter = name.charAt(0);

  return (
    <div className="p-6">
      <div className="grad-anime bg-gradient-to-l from-blue-900 to-blue-600 p-4 md:p-6 lg:p-6 rounded-lg mb-6">
        <div className="flex items-end justify-end mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
            <h1 className="text-center text-2xl text-white">{firstLetter}</h1>
          </div>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-4xl mb-4 text-white">
          {greeting}, {name} 👋
        </h1>
        <p className="text-lg text-gray-300">"{quote}"</p>
      </div>
    </div>
  );
}
