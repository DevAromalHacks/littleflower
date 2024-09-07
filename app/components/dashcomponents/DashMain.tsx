"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import Support from "../chat/Main";
import Notifications from "./tabs/Notifications";
import Home from "./tabs/Home";
import StudentsSideHam from "./ham/StudentsSideHam";
import Events from "./tabs/Events";
import Absent from "./tabs/Absent";
import Modal from "./tabs/model/Model";
import OnlineEvents from "./tabs/Online_Events";
import LogOut from "./tabs/Logout";
import Registration from "./tabs/Registration";
import { FaRegListAlt } from "react-icons/fa";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="disp_block displ_none">
        <StudentsSideHam />
      </div>
      <div className="disp_none displ_block">
        <div className="flex h-screen">
          <aside className="oil-black text-gray-300 py-4 w-64 h-full flex flex-col justify-between ">
            <div className="text-center text-2xl font-semibold mb-8">
              <div className="py-2 cursor-pointer">
                <span className="text-blue-400 hover:text-gray-200">
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
                  } hover:bg-gradient-to-r hover:from-sky-800 hover:to-indigo-700 rounded flex space-x-2 py-4 px-4 mb-4 items-center`}
                  onClick={() => setActiveTab(tab.label)}
                >
                  <FontAwesomeIcon icon={tab.icon} className="pt-1" />
                  <span>{tab.label}</span>
                </div>
              ))}
            </nav>

            <div className="mb-4 px-2">
              <div
                className="flex space-x-2 py-4 px-4 bg-red-600 hover:bg-red-700 rounded cursor-pointer items-center"
                onClick={handleLogoutClick}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="pt-1" />
                <span>Logout</span>
              </div>
            </div>
          </aside>
          <main className="flex-grow p-8 text-gray-600 text-2xl obsidean">
            {renderContent()}
          </main>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <LogOut />
        </Modal>
      )}
    </section>
  );
}