import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faTicketAlt } from "@fortawesome/free-solid-svg-icons";

// Initialize Supabase client
const supabase = createClientComponentClient();

export default function Ticket_Details() {
  const [formData, setFormData] = useState({
    name: "",
    admission_no: "",
    status: false, // Will be true for Paid, false for Not Paid
    class: "",
    div: "",
  });

  // Handle input change
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? (value === "true") : value, // Convert string to boolean
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("ticket").insert([
        {
          name: formData.name,
          class: formData.class,
          div: formData.div,
          admission_no: formData.admission_no,
          status: formData.status, // Ensure status is boolean in the database
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Ticket data uploaded");
      console.log("Student details added successfully:", data);

      // Reset form data
      setFormData({
        name: "",
        admission_no: "",
        class: "",
        div: "",
        status: false,
      });
    } catch (error) {
      toast.error("Error adding ticket details");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-6 bg-gray-900 text-white rounded-lg shadow-md border border-teal-500">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            Upload Ticket Info{" "}
            <FontAwesomeIcon icon={faTicketAlt} className="text-lime-400" />
          </h1>
          <p className="text-gray-400 text-sm lg:text-xl md:text-xl mt-1">
            Fill in the details below to upload Ticket information
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="tel"
              name="admission_no"
              placeholder="Admission No"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.admission_no}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="class"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.class}
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
            <select
              name="div"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.div}
            >
              <option value="">Select division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-2 text-sm font-medium text-white">
              Payment Status
            </label>
            <div className="flex space-x-4 justify-center">
              <label className="text-sm text-white">
                <input
                  type="radio"
                  name="status"
                  value="true"
                  onChange={handleChange}
                  checked={formData.status === true}
                  className="mr-2"
                />
                Paid
              </label>
              <label className="text-sm text-white">
                <input
                  type="radio"
                  name="status"
                  value="false"
                  onChange={handleChange}
                  checked={formData.status === false}
                  className="mr-2"
                />
                Not Paid
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="px-8 py-2 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
