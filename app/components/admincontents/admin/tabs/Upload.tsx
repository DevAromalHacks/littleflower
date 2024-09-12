"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faBell,
  faCloudUploadAlt,
  faBookmark,
  faTicketSimple
} from "@fortawesome/free-solid-svg-icons";
import Modal_component from "./model/Modal_Component";
import Upload_Image from "./model/Upload_Module";
import StudentUpload from "./model/Student_Upload";
import NotificationUpload from "./model/Notification_Upload";
import Ce from "./model/CE_Upload"
import Ticket_Details from "./model/Ticket_Details"

export default function Upload() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (content: any) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <section className="obsidean text-white p-8 rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Upload Content</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-gradient-to-r from-cyan-950 to-sky-900 hover:bg-gradient-to-l p-6 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => handleOpenModal("image")}
        >
          <div className="text-center">
            <FontAwesomeIcon icon={faUpload} className="text-4xl mb-4" />
            <p className="text-lg font-semibold">Upload Image</p>
            <p className="text-gray-400">Click here to upload an image</p>
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-cyan-950 to-sky-900 hover:bg-gradient-to-l p-6 rounded-lg flex items-center cursor-pointer justify-center"
          onClick={() => handleOpenModal("notification")}
        >
          <div className="text-center">
            <FontAwesomeIcon icon={faBell} className="text-4xl mb-4" />
            <p className="text-lg font-semibold">Push Notifications</p>
            <p className="text-gray-400">Send notifications to all users</p>
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-cyan-950 to-sky-900 hover:bg-gradient-to-l p-6 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => handleOpenModal("studentDetails")}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="text-4xl mb-4"
            />
            <p className="text-lg font-semibold">Upload student details</p>
            <p className="text-gray-400">Upload directly to database</p>
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-cyan-950 to-sky-900 hover:bg-gradient-to-l p-6 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => handleOpenModal("studentsCe")}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-4xl mb-4"
            />
            <p className="text-lg font-semibold">Upload CE</p>
            <p className="text-gray-400">Upload students CE mark</p>
          </div>
        </div>
        <div
          className="bg-gradient-to-r from-cyan-950 to-sky-900 hover:bg-gradient-to-l p-6 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => handleOpenModal("Ticket_Details")}
        >
          <div className="text-center">
            <FontAwesomeIcon
              icon={faTicketSimple}
              className="text-4xl mb-4"
            />
            <p className="text-lg font-semibold">Upload Tickets</p>
            <p className="text-gray-400">Upload students ticket details</p>
          </div>
        </div>
      </div>

      

      {isModalOpen && (
        <Modal_component onClose={handleCloseModal}>
          {modalContent === "image" && (
            <Upload_Image onClose={handleCloseModal} />
          )}
          {modalContent === "studentDetails" && <StudentUpload /> }
          {modalContent === "notification" && <NotificationUpload/>}
          {modalContent === "studentsCe" && <Ce/>}
          {modalContent === "Ticket_Details" && <Ticket_Details/>}
        </Modal_component>
      )}
    </section>
  );
}
