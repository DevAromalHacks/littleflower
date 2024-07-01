import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Event {
  id?: number;
  month: string;
  day: number;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const monthString = new Date(currentYear, currentMonth).toLocaleString(
          "default",
          { month: "long" }
        );
        let { data, error } = await supabase
          .from("Events")
          .select("*")
          .eq("month", monthString);

        if (error) throw error;

        console.log("Fetched events:", data);

        setEvents(data as Event[]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentMonth, currentYear]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    event: events.find((event) => event.day === i + 1) || null,
  }));

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white shadow-lg rounded-lg w-full md:w-3/4 lg:w-2/3 p-6">
            <div className="flex justify-between mb-4">
              <button
                onClick={handlePreviousMonth}
                className="text-blue-600 text-sm"
              >
                &lt; Prev
              </button>
              <h1 className="text-2xl font-bold text-center text-blue-600">
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}
              </h1>
              <button
                onClick={handleNextMonth}
                className="text-blue-600 text-sm"
              >
                Next &gt;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-base">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div key={index} className="font-semibold text-stone-800">
                    {day}
                  </div>
                )
              )}
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayIndex }).map((_, index) => (
                <div key={index}></div>
              ))}
              {/* Days of the month */}
              {daysArray.map((day, index) => (
                <div
                  key={index}
                  className={`border border-gray-300 rounded-md p-1 sm:p-2 flex flex-col justify-center items-center cursor-pointer h-10 sm:h-16 ${
                    day.event ? "bg-blue-500" : ""
                  }`}
                  onClick={() => day.event && handleEventClick(day.event)}
                >
                  <div className="font-semibold text-stone-900 text-sm">
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">
              {selectedEvent.description}
            </h2>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
