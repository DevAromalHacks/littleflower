"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  faUpload,
  faGraduationCap,
  faLayerGroup,
  faBook,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type Student = {
  id: string;
  name: string;
  class: string;
  div: string;
};

type MarkedStudent = {
  id: string;
  name: string;
  mark: number | null;
  subject: string;
};

export default function Gracemark() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedDiv, setSelectedDiv] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [markedStudents, setMarkedStudents] = useState<Student[]>([]);
  const [existingMarks, setExistingMarks] = useState<MarkedStudent[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [commonMark, setCommonMark] = useState<number | null>(null);
  const [recentlyMarked, setRecentlyMarked] = useState<MarkedStudent[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (selectedClass && selectedDiv) {
      fetchStudents(selectedClass, selectedDiv);
      fetchExistingMarks(selectedClass, selectedDiv, selectedSubject);
    }
  }, [selectedClass, selectedDiv, selectedSubject]);

  const fetchStudents = async (studentClass: string, studentDiv: string) => {
    try {
      const { data, error } = await supabase
        .from("Students_Data")
        .select("id, name, class, div")
        .eq("class", studentClass)
        .eq("div", studentDiv);

      if (error) {
        throw error;
      }

      setStudents(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExistingMarks = async (
    studentClass: string,
    studentDiv: string,
    subject: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("CE")
        .select("id, name, mark, subject")
        .eq("class", studentClass)
        .eq("div", studentDiv)
        .eq("subject", subject);

      if (error) {
        throw error;
      }

      setExistingMarks(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedClass(selectedValue);

    if (selectedValue === "10") {
      setSubjects([
        "Physics",
        "English",
        "Malayalam A",
        "Malayalam B",
        "Chemistry",
        "Biology",
        "IT",
        "Social",
        "Maths",
        "Hindi",
      ]);
    } else if (selectedValue === "11" || selectedValue === "12") {
      setSubjects([
        "Physics",
        "English",
        "Malayalam",
        "Chemistry",
        "Zoology",
        "Maths",
        "Hindi",
        "Botany"
      ]);
    } else {
      setSubjects([]);
    }
  };

  const handleDivChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiv(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const handleMarkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mark = parseInt(e.target.value);
    if (mark >= 0 && mark <= 10) {
      setCommonMark(mark);
    } else {
      setCommonMark(null);
    }
  };

  const handleCheckboxChange = (student: Student) => {
    setMarkedStudents((prev) => {
      const isStudentMarked = prev.some((s) => s.id === student.id);
      if (isStudentMarked) {
        return prev.filter((s) => s.id !== student.id);
      } else {
        return [...prev, student];
      }
    });
  };

  const handleSubmit = async () => {
    if (commonMark === null || commonMark < 0 || commonMark > 10) {
      toast.error("Please enter a valid mark between 0 and 10.");
      return;
    }

    const validMarkedStudents = markedStudents.map((student) => ({
      id: student.id,
      name: student.name,
      mark: commonMark,
      subject: selectedSubject,
      class: selectedClass,
      div: selectedDiv,
      month: selectedMonth,
    }));

    const { error } = await supabase.from("CE").insert(validMarkedStudents);

    if (error) {
      console.error(error);
      toast.error("An error occurred while submitting the marks.");
    } else {
      toast.success("CE Marks submitted successfully");

      // Remove marked students from the students list
      setStudents((prev) =>
        prev.filter((student) =>
          validMarkedStudents.every((marked) => marked.id !== student.id)
        )
      );

      // Add the validMarkedStudents to the recentlyMarked state
      setRecentlyMarked(validMarkedStudents);
      setMarkedStudents([]);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      !existingMarks.some(
        (markedStudent) =>
          markedStudent.id === student.id &&
          markedStudent.subject === selectedSubject
      )
  );

  return (
    <section className="min-h-80vh flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          <FontAwesomeIcon icon={faUpload} className="mr-2" />
          Upload Students CE
        </h1>
        <form>
          <div className="mb-4">
            <select
              name="class"
              id="class"
              className="block w-full h-10 p-2 text-xl text-gray-700 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedClass}
              onChange={handleClassChange}
              required
            >
              <option value="">Select class</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="division"
              id="division"
              className="block w-full h-10 p-2 text-xl text-gray-700 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDiv}
              onChange={handleDivChange}
              required
            >
              <option value="">Select Div</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="month"
              id="month"
              className="block w-full h-10 p-2 text-xl text-gray-700 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedMonth}
              onChange={handleMonthChange}
              required
            >
              <option value="">Select month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="subject"
              id="subject"
              className="block w-full h-10 p-2 text-xl text-gray-700 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedSubject}
              onChange={handleSubjectChange}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div>
            <hr />
          </div>
          <div className="mb-4">
            {filteredStudents.length > 0 ? (
              <ul className="bg-white border text-gray-700 border-gray-300 rounded-lg w-full max-h-60 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    className="p-2 flex justify-between items-center hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={() => handleCheckboxChange(student)}
                      />
                      <span>{student.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xl text-gray-700">
                No students found for the selected class and division.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Mark (0-10)
            </label>
            <select
              name="mark"
              id="mark"
              className="block w-full p-2 text-gray-700 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={commonMark !== null ? commonMark : ""}
              onChange={handleMarkChange}
              required
            >
              <option value="">Select Mark</option>
              <option value="0">0</option>
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
            </select>
          </div>
        </form>
        <div className="flex items-end justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-800 text-white text-base md:text-xl rounded-md"
            onClick={handleSubmit}
          >
            Submit CE
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Recently Marked Students
          </h2>
          {recentlyMarked.length > 0 ? (
            <ul className="bg-white border text-gray-700 border-gray-300 rounded-lg w-full max-h-40 overflow-y-auto">
              {recentlyMarked.map((student) => (
                <li
                  key={student.id}
                  className="p-2 flex justify-between items-center hover:bg-gray-100"
                >
                  <span className="text-sm md:text-base">{student.name}</span>
                  <span className="text-sm md:text-base">{student.mark}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600 text-xl">No students have been marked yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
