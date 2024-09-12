"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dashboard from "./tabs/Home";
import Teachers from "./tabs/Apps";
import Leave from "./tabs/Leave";
import Upload from "./tabs/Upload";
import Student_Info from "./tabs/Student_Info"
import {
  faTachometerAlt,
  faCalendarCheck,
  faCloudUploadAlt,
  faIdCard,
  faCalendarAlt,
  faBell,
  faDollarSign,
  faInbox,
  faSignOutAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import Ham from "./Ham/SideHam";
import Inbox from "./tabs/Inbox"

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    { label: "Dashboard", icon: faTachometerAlt },
    { label: "Apply for Leave", icon: faCalendarCheck },
    { label: "Upload", icon: faCloudUploadAlt },
    { label: "Students Details", icon: faIdCard },
    { label: "Calendar", icon: faCalendarAlt },
    { label: "Notifications", icon: faBell },
    { label: "Inbox", icon: faInbox },
    { label: "Apps", icon: faThLarge },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Apply for Leave":
        return <Leave />;
      case "Upload":
        return <Upload />;
      case "Students Details":
        return <Student_Info/>;
      case "Calendar":
        return <div>Calendar Content</div>;
      case "Notifications":
        return <div>Notifications Content</div>;
      case "Inbox":
        return <Inbox/>;
      case "Apps":
        return <Teachers />;
      default:
        return null;
    }
  };

  return (
    <section className="overflow-y-hidden">
      <div className="disp_block displ_none">
        <Ham />
      </div>
      <div className="disp_none displ_block">
        <div className="flex h-screen">
          <aside className="oil-black text-gray-300 py-4 w-64 h-full flex flex-col justify-between ">
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
                  } hover:bg-gradient-to-r hover:from-sky-800 hover:to-indigo-700 rounded flex space-x-2 py-4 px-4 mb-4 items-center`}
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
          <main className="flex-grow p-8 text-gray-600 text-2xl obsidean">
            {renderContent()}
          </main>
        </div>
      </div>
    </section>
  );
}
