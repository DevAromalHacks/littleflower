"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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

type Link = {
  id: string;
  title: string;
  url: string;
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
  const [notesLinks, setNotesLinks] = useState<Link[]>([]);
  const [pyqLinks, setPyqLinks] = useState<Link[]>([]);
  const supabase = createClientComponentClient();

  const predefinedNotesLinks = {
    Physics: [
      {
        id: "1",
        title: "Physics Notes Chapter 1",
        url: "https://example.com/physics/chapter1",
      },
      {
        id: "2",
        title: "Physics Notes Chapter 2",
        url: "https://example.com/physics/chapter2",
      },
    ],
    Chemistry: [
      {
        id: "1",
        title: "Chemistry Notes Chapter 1",
        url: "https://example.com/chemistry/chapter1",
      },
      {
        id: "2",
        title: "Chemistry Notes Chapter 2",
        url: "https://example.com/chemistry/chapter2",
      },
    ],
  };

  const predefinedPyqLinks = {
    Physics: [
      {
        id: "1",
        title: "Physics PYQ 2019",
        url: "https://example.com/physics/pyq2019",
      },
      {
        id: "2",
        title: "Physics PYQ 2020",
        url: "https://example.com/physics/pyq2020",
      },
    ],
    Chemistry: [
      {
        id: "1",
        title: "Chemistry PYQ 2019",
        url: "https://example.com/chemistry/pyq2019",
      },
      {
        id: "2",
        title: "Chemistry PYQ 2020",
        url: "https://example.com/chemistry/pyq2020",
      },
    ],
    // Add more subjects and their respective PYQs here
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");

    async function fetchUserData() {
      const { data, error } = await supabase
        .from("users")
        .select("className")
        .eq("email", userEmail);

      if (error) {
        console.error("Error fetching user data:", error.message);
      } else if (data && data.length > 0) {
        const userClass = data[0].className;
        setSelectedClass(userClass);

        if (userClass === "10") {
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
        } else if (userClass === "11" || userClass === "12") {
          setSubjects([
            "Physics",
            "English",
            "Malayalam",
            "Chemistry",
            "Zoology",
            "Maths",
            "Hindi",
            "Botany",
          ]);
        } else {
          setSubjects([]);
        }
      }
    }

    if (userEmail) {
      fetchUserData();
    }
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setNotesLinks(predefinedNotesLinks[e.target.value] || []);
    setPyqLinks(predefinedPyqLinks[e.target.value] || []);
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

      setStudents((prev) =>
        prev.filter((student) =>
          validMarkedStudents.every((marked) => marked.id !== student.id)
        )
      );

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
    <section className="min-h-80vh flex items-center justify-center ">
      <div className=" p-8 w-full max-w-xl">
        <h1 className="text-center text-3xl text-white pb-20">
          Gather your study materials
        </h1>
        <form>
          <div className="mb-4">
            <select
              name="subject"
              id="subject"
              className="block w-full h-14 p-2 text-xl text-gray-700 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </form>
        {selectedSubject && (
          <>
            <h2 className="text-2xl mt-6 mb-2 text-white">Notes</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Link</th>
                </tr>
              </thead>
              <tbody>
                {notesLinks.map((note) => (
                  <tr key={note.id}>
                    <td className="py-2 px-4 border-b">{note.title}</td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={note.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="text-2xl mt-6 mb-2 text-white">
              Previous Year Questions (PYQ)
            </h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Link</th>
                </tr>
              </thead>
              <tbody>
                {pyqLinks.map((pyq) => (
                  <tr key={pyq.id}>
                    <td className="py-2 px-4 border-b">{pyq.title}</td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={pyq.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
}
