"use client";
import { useState, useEffect } from "react";
import {
  faHome,
  faUserGraduate,
  faCalendarCheck,
  faLifeRing,
  faVideo,
  faBell,
  faCalendarTimes,
  faCog,
  faSignOutAlt,
  faTicket,
  faUser,
  faRegistered,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Support from "../../chat/Main";
import Notifications from "../tabs/Notifications";
import Home from "../tabs/Home";
import Absent from "../tabs/Absent";
import Events from "../tabs/Events";
import Resource from "../tabs/Resources";
import OnlineEvents from "../tabs/Online_Events";
import Registration from "../tabs/Registration";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { label: "Home", icon: faHome },
    { label: "Registration", icon: faListCheck },
    { label: "Upcoming Events", icon: faCalendarCheck }, // changed icon
    { label: "Support", icon: faLifeRing }, // changed icon
    { label: "Online Events", icon: faVideo }, // changed icon
    { label: "Notifications", icon: faBell },
    // { label: "Absent Days", icon: faCalendarTimes }, // changed icon
    { label: "Hall Ticket", icon: faTicket},
    { label: "Profile", icon: faUser }
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "Registration":
        return <Registration/>;
      case "Upcoming Events":
        return <Events />;
      case "Support":
        return <Support />;
      case "Online Events":
        return <OnlineEvents />;
      case "Notifications":
        return <Notifications />;
      case "Hall Ticket":
        return <Absent />;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = isMenuOpen ? "hidden" : "auto";
    }
    return () => {
      if (body) {
        body.style.overflow = "auto";
      }
    };
  }, [isMenuOpen]);

  return (
    <section className="pb-4 block md:block lg:hidden overflow-y-hidden">
      <div className="absolute top-0 left-0">
        <nav className="h-20 w-full py-8 fixed z-50 lg:flex lg:justify-between lg:items-center">
          <div className="flex justify-between items-center w-full px-2 lg:px-0">
            <button
              onClick={toggleMenu}
              className="lg:hidden z-10 px-3 rounded-2xl focus:outline-none"
            >
              <div className="relative">
                <div
                  className={`w-8 h-0.5 bg-white mb-2 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-3.5" : ""
                  }`}
                ></div>
                <div
                  className={`w-8 h-0.5 bg-white mb-2 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-8 h-0.5 bg-white transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden w-64 fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col items-center justify-center space-y-4">
          <aside className="oil-black text-gray-300 py-4 w-64 h-full flex flex-col justify-between">
            <div className="text-center text-2xl font-semibold mb-8">
              <div className="py-2 cursor-pointer">
                <span className="text-purple-400 hover:text-gray-200">
                  Little Flower
                </span>
              </div>
            </div>

            <nav className="px-4 flex-grow">
              {tabs.map((tab) => (
                <div
                  key={tab.label}
                  className={`cursor-pointer ${
                    activeTab === tab.label
                      ? "bg-gradient-to-r from-blue-900 to-blue-600 text-white"
                      : "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200"
                  } hover:grad-bg-light rounded flex space-x-2 py-4 px-4 mb-4 items-center`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  <FontAwesomeIcon icon={tab.icon} className="pt-1" />
                  <span>{tab.label}</span>
                </div>
              ))}
            </nav>

            <div className="mb-4 px-2">
              <div className="flex space-x-2 py-4 px-4 bg-red-600 hover:bg-red-700 rounded cursor-pointer items-center">
                <FontAwesomeIcon icon={faSignOutAlt} className="pt-1" />
                <span>Logout</span>
              </div>
            </div>
          </aside>
        </div>
      )}
      <main className="flex-grow p-8 text-gray-600 text-2xl obsidean">
        {renderContent()}
      </main>
    </section>
  );
}
