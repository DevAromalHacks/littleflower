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
      <div className="grad-anime w-full p-6 rounded-lg mb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-teal-100 shadow-lg rounded p-4">
          <h2 className="text-xl mb-2">Student Overview</h2>
          <ul className="font-serif">
            <li>Total Students: 200</li>
            <li>Students with Pending Fees: 15</li>
            <li>Average Grade: B+</li>
          </ul>
        </div>
        <div className="bg-yellow-100 shadow-lg rounded p-4">
          <h2 className="text-xl mb-2">Teacher Overview</h2>
          <ul className="font-serif">
            <li>Total Teachers: 25</li>
            <li>Teachers on Leave: 2</li>
            <li>New Teachers Joined: 1</li>
          </ul>
        </div>
        <div className="bg-purple-100 shadow-lg rounded p-4">
          <h2 className="text-xl mb-2">Administrative Tasks</h2>
          <ul className="font-serif">
            <li>Approve New Admissions</li>
            <li>Review Budget Report</li>
            <li>Update School Policies</li>
          </ul>
        </div>
        <div className="bg-green-100 shadow-lg rounded p-4">
          <h2 className="text-xl mb-2">Upcoming Events</h2>
          <ul className="font-serif">
            <li>Board Meeting - May 25</li>
            <li>Annual Day - June 1</li>
          </ul>
        </div>
        <div className="bg-red-100 shadow-lg rounded p-4">
          <h2 className="text-xl mb-2">Recent Notifications</h2>
          <ul className="font-serif">
            <li>New Message from Principal</li>
            <li>Parent-Teacher Meeting Reminder</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
