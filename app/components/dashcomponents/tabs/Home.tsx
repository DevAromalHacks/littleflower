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
        <div className="grad-anime bg-gradient-to-l from-blue-900 to-blue-600 p-4 md:p-6 lg:p-6 rounded-lg mb-6">
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
      </div>
    </section>
  );
}
