"use client";

import Ticket from "../components/dashcomponents/tabs/halltickets/Tickets";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

export default function OnlineEvent() {
  const [user, setUser] = useState<User | null>(null);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const supabase = createClientComponentClient();

  const printTicket = () => {
    window.print();
  };

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

  return (
    <div>
      <h2 className="text-white text-2xl text-center print:hidden py-10">
        Ticket preview
      </h2>
      <div id="ticket-print">{ticket && <Ticket ticketData={ticket} />}</div>
      <div className="flex items-center py-4 justify-center">
        <button
          className="print:hidden rounded-lg text-lg bg-gradient-to-r from-blue-950 to-blue-500 hover:bg-gradient-to-r text-white px-8 py-2 ml-2 hover:bg-indigo-700 transition duration-300"
          onClick={printTicket}
        >
          Print
        </button>
      </div>
    </div>
  );
}
