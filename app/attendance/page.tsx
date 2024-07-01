"use client";

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faUserClock } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

interface Student {
  id: number;
  name: string;
  roll: number;
  phone_number: string;
}

export default function Attendance() {
  const [students, setStudents] = useState<Student[]>([]);
  const [absentees, setAbsentees] = useState<Student[]>([]);
  const [classSelected, setClassSelected] = useState<string>("");
  const [divSelected, setDivSelected] = useState<string>("");
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (classSelected && divSelected) {
      fetchStudents(classSelected, divSelected);
    }
  }, [classSelected, divSelected]);

  const fetchStudents = async (classSelected: string, divSelected: string) => {
    try {
      const { data: studentsData, error } = await supabase
        .from("Students_Data")
        .select("*")
        .eq("class", classSelected)
        .eq("div", divSelected);
      if (error) {
        throw error;
      }
      setStudents(studentsData || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleFetchStudents = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (classSelected && divSelected) {
      fetchStudents(classSelected, divSelected);
    } else {
      toast.error("Please select both class and division.");
    }
  };

  const handleLateStudent = async (student: Student) => {
    try {
      const response = await fetch("https://eightc562bc5-b1fe-46f1-a0bf-4cece4e9610b.onrender.com/api/late", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: student.name,
          phone: student.phone_number,
          class: classSelected,
          div: divSelected,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      toast.success("Student marked as late");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  

  const handleToggleAbsentee = (student: Student) => {
    if (absentees.find((absentee) => absentee.id === student.id)) {
      setAbsentees((prevAbsentees) =>
        prevAbsentees.filter((absentee) => absentee.id !== student.id)
      );
    } else {
      setAbsentees((prevAbsentees) => [...prevAbsentees, student]);
    }
  };

  const handleSubmitAbsentees = async () => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      const absenteePromises = absentees.map(async (student) => {
        const { error: insertError } = await supabase.from("AbsentDays").insert([
          {
            name: student.name,
            phone_number: student.phone_number,
            class: classSelected,
            div: divSelected,
            month: currentMonth,
            day: currentDay,
          },
        ]);
        if (insertError) {
          throw insertError;
        }

        const response = await fetch("https://eightc562bc5-b1fe-46f1-a0bf-4cece4e9610b.onrender.com/api/whatsapp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: student.name,
            phone: student.phone_number,
            class: classSelected,
            div: divSelected,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
      });

      await Promise.all(absenteePromises);
      toast.success("Absentees marked and WhatsApp message sent successfully.");
      setAbsentees([]);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-300 to-blue-500 min-h-screen p-10 text-gray-900">
      <h1 className="text-center font-bold text-white text-4xl py-10">
        Take Attendance
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <form className="flex gap-2 mb-4" onSubmit={handleFetchStudents}>
            <div>
              <label className="block text-gray-700">Select class</label>
              <select
                name="class"
                value={classSelected}
                onChange={(e) => setClassSelected(e.target.value)}
                className="block w-full p-2 rounded-md bg-gray-200 border border-gray-300 text-gray-800"
                required
              >
                <option value="">Select class</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Select division</label>
              <select
                name="div"
                value={divSelected}
                onChange={(e) => setDivSelected(e.target.value)}
                className="block w-full p-2 rounded-md bg-gray-200 border border-gray-300 text-gray-800"
                required
              >
                <option value="">Select division</option>
                {["A", "B", "C"].map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
           <div className="pt-6">
           <button
              type="submit"
              className="bg-blue-500 text-white  px-10 py-[9px] rounded-md"
            >
              fetch
            </button>
           </div>
          </form>
          <div>
            {students.length > 0 ? (
              <ul>
                <div className="flex justify-between font-semibold mb-4">
                  <li>Name</li>
                  <li>Roll No</li>
                  <li>Actions</li>
                </div>
                {students.map((student) => (
                  <li key={student.id} className="flex items-center py-2 border-b border-gray-300">
                    <span className="w-1/3">{student.name}</span>
                    <span className="w-1/3">{student.roll}</span>
                    <div className="w-1/3 flex justify-end items-center">
                      <input
                        type="checkbox"
                        onChange={() => handleToggleAbsentee(student)}
                        checked={absentees.some(
                          (absentee) => absentee.id === student.id
                        )}
                        className="mr-2"
                      />
                      <button
                        onClick={() => handleLateStudent(student)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md ml-2 flex items-center"
                      >
                        <FontAwesomeIcon icon={faUserClock} className="mr-1" /> Late
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students found.</p>
            )}
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleSubmitAbsentees}
              className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
              disabled={absentees.length === 0}
            >
              <FontAwesomeIcon icon={faCheck} className="mr-1" /> Submit Absentees
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
