"use client";

import Event from "../components/dashcomponents/tabs/halltickets/Tickets";

export default function OnlineEvent() {
  const print = () => {
    window.print();
  };

  return (
    <div>
      
      <div className="flex items-center justify-center">
        <button
          className="print:hidden rounded-lg text-lg bg-gradient-to-r from-blue-950 to-blue-500 hover:bg-gradient-to-r text-white px-4 py-2 ml-2 hover:bg-indigo-700 transition duration-300"
          onClick={print}
        >
          Print
        </button>
      </div>
    </div>
  );
}
