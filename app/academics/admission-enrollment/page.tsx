"use client";

import CustomHeader from "@/app/components/includes/CustomHeader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/app/components/screens/Footer";
import { useState, ChangeEvent, FormEvent } from "react";

export default function AdmissionEnrollment() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    standard: "",
    dob: "",
    gender: "",
    address: "",
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    nationality: "",
    motherTongue: "",
    religion: "",
    previousSchool: "",
    lastGrade: "",
    category: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, name } = e.target;
    if (type !== "radio") {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error("Error submitting application: " + error.message);
        return;
      }

      toast.success("Application submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        standard: "",
        dob: "",
        gender: "",
        address: "",
        fatherName: "",
        fatherPhone: "",
        motherName: "",
        motherPhone: "",
        nationality: "",
        motherTongue: "",
        religion: "",
        previousSchool: "",
        lastGrade: "",
        category: "",
      });
    } catch (error) {
      toast.info("An unexpected error occurred. Please try again later.");
      console.error(error);
    }
  };

  const newYear = new Date().getFullYear()
  const nextYear = newYear + 1
  const nextYearFirstTwo = nextYear.toString().slice(-2)


  return (
    <section>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CustomHeader />
      <section className="pt-40 bg-gray-50 min-h-screen">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-teal-700">
            Application for Admission <span className="text-yellow-500">{newYear}-{nextYearFirstTwo}</span>
          </h2>
          <p className="text-gray-500 mt-2">
            We are excited to assist you with your enquiry! Please fill out the
            details below to help our admissions team connect with you.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-8 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-medium"
              >
                First Name of the child{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter child's first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-medium"
              >
                Surname <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter child's last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="standard"
                className="block text-gray-700 font-medium"
              >
                Standard to which admission is sought{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <select
                id="standard"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                value={formData.standard}
                onChange={handleChange}
                required
              >
                <option value="">Select Standard</option>
                <option value="UKG">UKG</option>
                <option value="LKG">LKG</option>
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
                <option value="+1">+1</option>
                <option value="+2">+2</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block text-gray-700 font-medium">
                Date of Birth <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="date"
                id="dob"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium">
              Gender <span className="text-xl text-red-600">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div>
                <input
                  type="radio"
                  id="genderMale"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <label htmlFor="genderMale" className="ml-2 text-gray-600">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="genderFemale"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <label htmlFor="genderFemale" className="ml-2 text-gray-600">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="genderOther"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                <label htmlFor="genderOther" className="ml-2 text-gray-600">
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium"
            >
              Residential Address{" "}
              <span className="text-xl text-red-600">*</span>
            </label>
            <textarea
              id="address"
              className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Father & Mother Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="fatherName"
                className="block text-gray-700 font-medium"
              >
                Father&apos;s Name{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fatherName"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter Father's Name"
                value={formData.fatherName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="fatherPhone"
                className="block text-gray-700 font-medium"
              >
                Father&apos;s Phone No{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="fatherPhone"
                maxLength={10}
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter Father's Phone No"
                value={formData.fatherPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="motherName"
                className="block text-gray-700 font-medium"
              >
                Mother&apos;s Name{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="motherName"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter Mother's Name"
                value={formData.motherName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="motherPhone"
                className="block text-gray-700 font-medium"
              >
                Mother&apos;s Phone No{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="motherPhone"
                maxLength={10}
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter Mother's Phone No"
                value={formData.motherPhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Other fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="nationality"
                className="block text-gray-700 font-medium"
              >
                Nationality <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="nationality"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="motherTongue"
                className="block text-gray-700 font-medium"
              >
                Mother&apos;s Tongue{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="motherTongue"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter mother's tongue"
                value={formData.motherTongue}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="religion"
                className="block text-gray-700 font-medium"
              >
                Religion <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="religion"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter religion"
                value={formData.religion}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="previousSchool"
                className="block text-gray-700 font-medium"
              >
                Previous School <span className="text-xl text-red-600">*</span>
              </label>
              <input
                type="text"
                id="previousSchool"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                placeholder="Enter previous school"
                value={formData.previousSchool}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="lastGrade"
                className="block text-gray-700 font-medium"
              >
                Last Grade Studied{" "}
                <span className="text-xl text-red-600">*</span>
              </label>
              <select
               id="lastGrade"
               className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
               value={formData.lastGrade}
               onChange={handleChange}
               required
              >
                <option value="">Select Standard</option>
                <option value="UKG">UKG</option>
                <option value="LKG">LKG</option>
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
                <option value="+1">+1</option>
                <option value="+2">+2</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium"
              >
                Select Category <span className="text-xl text-red-600">*</span>
              </label>
              <select
                id="category"
                className="w-full border border-teal-300 rounded-md p-2 focus:ring-2 focus:ring-teal-600"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-2 rounded-md hover:bg-teal-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </section>
  );
}
