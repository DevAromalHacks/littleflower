"use client";

import { useState, FormEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

interface DataItem {
  name: string;
  class: string;
  div: string;
  subject: string;
  month: string;
  mark: number;
}

export default function Ce() {
  const [subject, setSubject] = useState<string>("");
  const [division, setDivision] = useState<string>("");
  const [classValue, setClassValue] = useState<string>("");
  const [data, setData] = useState<DataItem[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Fetch data from Supabase
    const { data: fetchedData, error } = await supabase
      .from("CE")
      .select("*")
      .eq("subject", subject)
      .eq("div", division)
      .eq("class", classValue);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(fetchedData || []);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="p-8 min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center print:hidden">
          Fetch CE Data
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 print:hidden">
          <select
            name="class"
            id="class"
            className="block w-full h-10 p-2 text-xl text-gray-300 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
            required
          >
            <option value="">Select class</option>
            <option value="10">10</option>
            <option value="11">+1</option>
            <option value="12">+2</option>
          </select>
          <select
            name="division"
            id="division"
            className="block w-full h-10 p-2 text-xl text-gray-300 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            required
          >
            <option value="">Select Div</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <select
            name="Subject"
            id="subject"
            className="block w-full p-2 text-gray-300 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            <option value="Physics">Physics</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Zoology">Zoology</option>
            <option value="Maths">Maths</option>
            <option value="Hindi">Hindi</option>
            <option value="Botany">Botany</option>
            <option value="MalayalamA">Malayalam A</option>
            <option value="MalayalamB">Malayalam B</option>
            <option value="Biology">Biology</option>
            <option value="IT">IT</option>
            <option value="Social">Social</option>
          </select>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        <div className="mt-8">
          {data.length > 0 && (
            <>
              <table className="w-full table-auto bg-gray-800 border border-gray-700 rounded-md shadow-md mt-6">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-2 border text-gray-300">Name</th>
                    <th className="px-4 py-2 border text-gray-300">Class</th>
                    <th className="px-4 py-2 border text-gray-300">Division</th>
                    <th className="px-4 py-2 border text-gray-300">Subject</th>
                    <th className="px-4 py-2 border text-gray-300">Month</th>
                    <th className="px-4 py-2 border text-gray-300">Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="border px-4 py-2 text-gray-300 text-center">
                        {item.name}
                      </td>
                      <td className="border px-4 py-2 text-gray-300 text-center">
                        {item.class}
                      </td>
                      <td className="border px-4 py-2 text-gray-300 text-center">
                        {item.div}
                      </td>
                      <td className="border px-4 py-2 text-gray-300 text-center">
                        {item.subject}
                      </td>
                      <td className="border px-4 py-2 text-gray-300 text-center">
                        {item.month}
                      </td>
                      <td className="border px-4 py-2 text-gray-300 text-center">
                        {item.mark}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pt-4 flex items-end justify-end">
                <button
                  onClick={handlePrint}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 print:hidden"
                >
                  Print Table
                </button>
              </div>
            </>
          )}
          {data.length === 0 && (
            <p className="text-center text-gray-500 mt-4 print:hidden">
              No data available
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
