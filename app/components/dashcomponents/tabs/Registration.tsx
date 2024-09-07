import { useState } from "react";
import Modal_component from "../../dashcomponents/tabs/model/Model";
import RegistrationModal from "./model/RegistrationModal";

export default function Registration() {
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
    <section>
      <div>
        <h1 className="text-center text-white text-3xl pb-10">
          Registration portal
        </h1>
        <div>
          <div
            className="bg-gradient-to-r from-blue-950 to-blue-500 hover:bg-gradient-to-r hover:from-cyan-950 hover:to-cyan-500 w-80 h-44 rounded-lg"
            onClick={() => handleOpenModal("registrationModal")}
          >
            <h2 className="flex items-center justify-center h-full text-white text-2xl">
              Register for Kalolsavam
            </h2>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal_component onClose={handleCloseModal}>
          {modalContent === "registrationModal" && <RegistrationModal />}
        </Modal_component>
      )}
    </section>
  );
}
