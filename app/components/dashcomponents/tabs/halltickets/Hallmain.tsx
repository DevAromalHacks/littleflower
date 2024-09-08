import { useEffect, useState } from "react";
import Modal_component from "../../../dashcomponents/tabs/model/Model";
import EligibilityModal from "../model/Eligibility";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Eligible from "../model/Eligible";

interface User {
  id: number;
  email: string;
  className: string;
  name: string;
  div: string;
  admission_no: number;
}

interface TicketData {
  id: number;
  name: string;
  status: boolean;
  class: number;
  div: string;
  admission_no: number;
}

export default function Hallmain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ticket, setTicket] = useState<TicketData | null>(null);

  const supabase = createClientComponentClient();

  const handleOpenModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Fetch user details
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      const fetchUser = async () => {
        try {
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", userEmail)
            .single();

          if (error) throw error;
          setUser(userData);
        } catch (error) {
          console.log("Error occurred while fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [supabase]);

  // Fetch ticket details using admission_no
  useEffect(() => {
    if (user && user.admission_no) {
      const fetchTicket = async () => {
        try {
          const { data: ticketData, error } = await supabase
            .from("ticket")
            .select("*")
            .eq("admission_no", user.admission_no)
            .single(); // Use single() if you expect only one result

          if (error) throw error;
          setTicket(ticketData);
        } catch (error) {
          console.log("Error occurred while fetching ticket:", error);
        }
      };
      fetchTicket();
    }
  }, [user]);

  const handleBoxClick = () => {
    if (ticket) {
      if (ticket.status) {
        handleOpenModal("Eligible"); // Changed from "TicketModal" to "Eligible"
      } else {
        handleOpenModal("EligibilityModal");
      }
    }
  };

  return (
    <section>
      <div>
        <h1 className="text-center text-white text-3xl pb-10">
          Collect your hall tickets
        </h1>
        <div>
          <div
            className="bg-gradient-to-r from-blue-950 to-blue-500 hover:bg-gradient-to-r hover:from-cyan-950 hover:to-cyan-500 w-80 h-44 rounded-lg cursor-pointer"
            onClick={handleBoxClick}
          >
            <h2 className="flex items-center justify-center h-full text-white text-2xl">
              Christmas exam hall tickets
            </h2>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal_component onClose={handleCloseModal}>
          {modalContent === "EligibilityModal" && <EligibilityModal />}
          {modalContent === "Eligible" && <Eligible />}
        </Modal_component>
      )}
    </section>
  );
}
