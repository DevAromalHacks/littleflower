import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

// Initialize Supabase client
const supabase = createClientComponentClient();

export default function StudentUpload() {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    admission_no: "",
    phone_no: "",
    level: "",
    class: "",
    div: "",
    date_Of_birth: "",
    aadhar_no: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    // Special handling for phone number field
    if (name === "phone_no") {
      // Check if the phone number starts with +91, if not, add it
      const formattedPhoneNo = value.startsWith("+91") ? value : `+91${value}`;
      setFormData({ ...formData, [name]: formattedPhoneNo });
    } else if (name === "date_Of_birth") {
      // Special handling for date of birth field
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (regex.test(value)) {
        setFormData({ ...formData, date_Of_birth: rearrangeDateFormat(value) });
      } else {
        setFormData({ ...formData, date_Of_birth: value });
      }
    } else {
      // For other fields, simply update formData
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("Students_Data").insert([
        {
          name: formData.name,
          roll: formData.roll,
          admission_no: formData.admission_no,
          phone_number: formData.phone_no,
          level: formData.level,
          class: formData.class,
          div: formData.div,
          date_of_birth: formData.date_Of_birth,
          aadhar_no: formData.aadhar_no,
        },
      ]);
      toast.success("Student data uploaded");
      if (error) {
        throw error;
      }

      console.log("Student details added successfully:", data);
      setFormData({
        name: "",
        roll: "",
        admission_no: "",
        phone_no: "",
        level: "",
        class: "",
        div: "",
        date_Of_birth: "",
        aadhar_no: "",
      });
    } catch (error) {
      toast.error("Error adding student details");
    }
  };

  const rearrangeDateFormat = (dateString: {
    split: (arg0: string) => [any, any, any];
  }) => {
    const [day, month, year] = dateString.split("/");

    const rearrangedDate = `${year}/${month}/${day}`;

    return rearrangedDate;
  };

  return (
    <section className="p-6 px-8 bg-gray-800 text-white rounded-lg shadow-md border border-teal-500">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">
          Upload Student Info{" "}
          <FontAwesomeIcon icon={faCloudUploadAlt} className="text-teal-400" />
        </h1>
        <p className="text-gray-400 text-sm lg:text-xl md:text-xl mt-1">
          Fill in the details below to upload student information
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <input
              type="tel"
              name="roll"
              placeholder="Enter roll no"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              maxLength={2}
              onChange={handleChange}
              value={formData.roll}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="tel"
              name="admission_no"
              placeholder="Admission No"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.admission_no}
            />
          </div>
          <div>
            <input
              type="tel"
              maxLength={14}
              name="phone_no"
              placeholder="Phone Number"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.phone_no}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <select
              name="level"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.level}
            >
              <option value="">Select grade level</option>
              <option value="Kg">Kg</option>
              <option value="Lp">Lp</option>
              <option value="Up">Up</option>
              <option value="Hs">Hs</option>
              <option value="Hss">Hss</option>
            </select>
          </div>
          <div>
            <select
              name="class"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
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
          </div>
          <div>
            <select
              name="div"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
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
          <div>
            <input
              type="date"
              name="date_Of_birth"
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              onChange={handleChange}
              value={formData.date_Of_birth}
            />
          </div>
          <div>
            <input
              type="tel"
              name="aadhar_no" // Corrected name attribute
              className="w-full p-1.5 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
              placeholder="Aadhar No"
              maxLength={12}
              onChange={handleChange}
              value={formData.aadhar_no}
            />
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <button
            type="submit"
            className="px-8 py-1.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
