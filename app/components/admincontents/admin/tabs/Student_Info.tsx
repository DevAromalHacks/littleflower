"use client";
import React, { useState, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

interface Student {
  id: string;
  name: string;
  class: string;
  div: string;
  aadhar_no: number;
}

export default function Student_Info() {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentInfo, setStudentInfo] = useState<Student | null>(null);
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [div, setDiv] = useState("");
  const [className, setClassName] = useState("");
  const [name, setName] = useState("");
  const [aadharNo, setAadharNo] = useState<number | string>(""); // Updated type to number | string
  const [fetchedStudents, setFetchedStudents] = useState<Student[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (searchTerm) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const fetchSuggestions = async (query: string) => {
    try {
      const { data, error } = await supabase
        .from("Students_Data")
        .select("id, name, class, div, aadhar_no")
        .ilike("name", `%${query}%`);

      if (error) {
        throw error;
      }

      setSuggestions((data as Student[]) || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("Students_Data")
        .select("id, name, class, div, aadhar_no")
        .eq("name", searchTerm)
        .single<Student>();

      if (error) {
        throw error;
      }

      setStudentInfo(data);
      toast.success("Student found");
    } catch (error) {
      console.error(error);
      toast.error("Student not found");
    }
  };

  const handleSuggestionClick = (student: Student) => {
    setSearchTerm(student.name);
    setStudentInfo(student);
    setSuggestions([]);
  };

  const handleFetchByDivAndClass = async () => {
    try {
      const { data, error } = await supabase
        .from("Students_Data")
        .select("id, name, class, div, aadhar_no")
        .eq("div", div)
        .eq("class", className);

      if (error) {
        throw error;
      }

      setFetchedStudents((data as Student[]) || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (selectedStudent) {
      try {
        const { error } = await supabase
          .from("Students_Data")
          .delete()
          .eq("id", selectedStudent.id);

        if (error) {
          throw error;
        }

        setFetchedStudents(fetchedStudents.filter(s => s.id !== selectedStudent.id));
        setSelectedStudent(null);
        toast.success("Student deleted");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete student");
      }
    }
  };

  const handleUpdate = async () => {
    if (selectedStudent) {
      try {
        const { error } = await supabase
          .from("Students_Data")
          .update({
            name,
            class: className,
            div,
            aadhar_no: typeof aadharNo === 'string' ? parseInt(aadharNo) : aadharNo
          })
          .eq("id", selectedStudent.id);

        if (error) {
          throw error;
        }

        const updatedStudents = fetchedStudents.map(s =>
          s.id === selectedStudent.id
            ? { ...s, name, class: className, div, aadhar_no: typeof aadharNo === 'string' ? parseInt(aadharNo) : aadharNo }
            : s
        );
        setFetchedStudents(updatedStudents);
        setSelectedStudent(null);
        setName("");
        setDiv("");
        setClassName("");
        setAadharNo("");
        toast.success("Student updated");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update student");
      }
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mb-4">
        <form className="flex items-center mb-4" onSubmit={handleSearch}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a student"
              className="w-full text-gray-800 h-10 rounded-lg text-lg pl-4 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-gray-300 border border-gray-300 rounded-lg mt-1 w-full z-10">
                {suggestions.map((student) => (
                  <li
                    key={student.id}
                    className="p-2 cursor-pointer text-xl flex justify-between hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(student)}
                  >
                    <span>{student.name}</span>
                    <span>{student.class}</span>
                    <span>{student.div}</span>
                    <span>{student.aadhar_no}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white text-lg font-semibold rounded-lg px-6 py-2 ml-4 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
            <span className="ml-2">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </button>
        </form>
        {studentInfo && (
          <div className="mt-4 text-indigo-600">
            <p>Name: {studentInfo.name}</p>
            <p>Class: {studentInfo.class}</p>
            <p>Division: {studentInfo.div}</p>
            <p>Aadhar No: {studentInfo.aadhar_no}</p>
          </div>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mb-4">
        <div className="mb-4">
          <label
            htmlFor="div"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Division
          </label>
          <select
            id="div"
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={div}
            onChange={(e) => setDiv(e.target.value)}
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="class"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Class
          </label>
          <select
            id="class"
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="Lkg">LKG</option>
            <option value="Ukg">UKG</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFetchByDivAndClass}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Fetch Students
        </button>
        {fetchedStudents.length > 0 && (
          <ul className="mt-4 space-y-2">
            {fetchedStudents.map((student) => (
              <li key={student.id} className="flex items-center">
                <input
                  type="radio"
                  id={student.id}
                  name="selectedStudent"
                  value={student.id}
                  onChange={() => setSelectedStudent(student)}
                  className="mr-2"
                />
                <label htmlFor={student.id} className="text-lg">
                  {student.name} - {student.class} - {student.div} - {student.aadhar_no}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedStudent && (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mb-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="updateDiv"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Division
            </label>
            <select
              id="updateDiv"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={div}
              onChange={(e) => setDiv(e.target.value)}
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="updateClass"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              id="updateClass"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="Lkg">LKG</option>
              <option value="Ukg">UKG</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="aadharNo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Aadhar Number
            </label>
            <input
              id="aadharNo"
              type="tel"
              placeholder="Aadhar No"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={aadharNo}
              onChange={(e) => setAadharNo(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
