import React, { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Home");
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState(
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      try {
        const response = await fetch(`/api/server/route?email=${email}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await response.json();

        const { name, date_of_birth: dateOfBirth } = userData;
        setName(name || "User");

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        if (dateOfBirth) {
          const [birthYear, birthMonth, birthDay] = dateOfBirth.split("-").map(Number);

          if (birthMonth === currentMonth && birthDay === currentDay) {
            setGreeting("Happy Birthday");
          } else {
            setGreeting(getCurrentGreeting());
          }
        } else {
          setGreeting(getCurrentGreeting());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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

  const firstLetter = name.charAt(0);

  return (
    <section className="text-white">
      <div className="p-0 md:p-6 lg:p-6">
        <div className="grad-anime p-4 md:p-6 lg:p-6 rounded-lg mb-6">
          <div className="flex items-end justify-end mb-6">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <h1 className="text-center text-2xl text-white">{firstLetter}</h1>
            </div>
          </div>
          <h1 className="text-3xl mb-4 text-white">
            {greeting}, {name} 🎉
          </h1>
          <p className="text-xl text-white">{quote}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-teal-500 shadow-lg rounded p-4">
            <h2 className="text-xl mb-2">Quick Stats</h2>
            <ul className="font-serif">
              <li>Total Assignments: 10</li>
              <li>Pending Tasks: 3</li>
            </ul>
          </div>
          <div className="bg-yellow-500 shadow-lg rounded p-4">
            <h2 className="text-xl mb-2">Recent Activities</h2>
            <ul className="font-serif">
              <li>Assignment 1 graded</li>
              <li>New course material added</li>
              <li>Meeting scheduled for Monday</li>
            </ul>
          </div>
          <div className="bg-purple-500 shadow-lg rounded p-4">
            <h2 className="text-xl mb-2">Upcoming Events</h2>
            <ul className="font-serif">
              <li>Math Test - May 22</li>
              <li>Science Fair - May 20</li>
            </ul>
          </div>
          <div className="bg-green-500 shadow-lg rounded p-4">
            <h2 className="text-xl mb-2">To-Do List</h2>
            <ul className="font-serif">
              <li>Complete Math Homework</li>
              <li>Submit English Essay</li>
            </ul>
          </div>
          <div className="bg-red-500 shadow-lg rounded p-4">
            <h2 className="text-xl mb-2">Notifications</h2>
            <ul className="font-serif">
              <li>New Message from Mr. Smith</li>
              <li>Assignment Feedback available</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
