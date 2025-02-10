"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { Moon, Sun } from "lucide-react";

interface Student {
  id: number;
  name: string;
  roll: number;
  phone_number: string;
}

export default function Attendance() {
  const [step, setStep] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [classSelected, setClassSelected] = useState<string>("");
  const [divSelected, setDivSelected] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const studentsRef = useRef<HTMLDivElement>(null);
  const supabase = createClientComponentClient();

  const fetchStudents = async () => {
    try {
      const { data: studentsData, error } = await supabase
        .from("Students_Data")
        .select("*")
        .eq("class", classSelected)
        .eq("div", divSelected);
      if (error) throw error;
      setStudents(studentsData || []);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleNextStep = () => {
    if (!classSelected || !divSelected) {
      toast.error("Please select a class and division.");
      return;
    }
    fetchStudents();
    setStep(2);
  };

  const handleSubmitAbsentees = async () => {
    try {
      if (!studentsRef.current) return;

      const checkedStudents = students.filter((student) => {
        const checkbox = document.getElementById(
          `student-${student.id}`
        ) as HTMLInputElement;
        return checkbox?.checked;
      });

      if (checkedStudents.length === 0) {
        toast.error("No students selected as absent.");
        return;
      }

      const currentDate = new Date().toLocaleDateString("en-GB");

      const absenteePromises = checkedStudents.map((student) =>
        fetch("/api/absentees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: student.name,
            className: classSelected,
            div: divSelected,
            day: currentDate,
            phone: student.phone_number,
          }),
        })
      );

      await Promise.all(absenteePromises);
      toast.success("Absentees marked and notified successfully.");
    } catch (error) {
      toast.error(`Failed to mark absentees.,${error}`);
    }
  };

  useEffect(() => {
    if (step === 2 && studentsRef.current) {
      studentsRef.current.innerHTML = students
        .map(
          (student) => `
            <div class="grid grid-cols-3 items-center py-2 border-b">
              <span>${student.name}</span>
              <span>${student.roll}</span>
              <div class="flex justify-end items-center gap-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" id="student-${student.id}" class="form-checkbox h-5 w-5 text-sky-500" />
                  <span class="text-green-500">Absent</span>
                </label>
              </div>
            </div>
          `
        )
        .join("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students]);

  return (
    <section className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {/* Navbar */}
        <div className="flex justify-between items-center p-5 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-2xl font-bold">Take Attendance</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Step 1: Select Class & Division */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-6 p-10">
            <h2 className="text-xl font-semibold">Select Class & Division</h2>
            <div className="flex items-center justify-center h-96 w-full">
              <div>
                <div>
                  <label className="block font-semibold">Class</label>
                  <select
                    value={classSelected}
                    onChange={(e) => setClassSelected(e.target.value)}
                    className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-500 w-full"
                  >
                    <option value="">Select class</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1)}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <div>
                  <label className="block font-semibold">Division</label>
                  <select
                    value={divSelected}
                    onChange={(e) => setDivSelected(e.target.value)}
                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select division</option>
                    {["A", "B", "C"].map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleNextStep}
                    className="mt-8 bg-sky-500 text-white px-48 py-2 rounded-md hover:bg-sky-600 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Show Students */}
        {step === 2 && (
          <div className="p-5">
            <h2 className="text-xl font-semibold text-center mb-4">
              Mark Attendance for Class {classSelected} - {divSelected}
            </h2>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
              <div className="grid grid-cols-3 font-semibold border-b pb-2">
                <span>Name</span>
                <span>Roll No</span>
                <span className="text-right">Absent</span>
              </div>
              <div ref={studentsRef}></div>
            </div>

            {/* Submit Absentees */}
            <div className="text-center p-5">
              <button
                onClick={handleSubmitAbsentees}
                className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
              >
                Submit Absentees
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
