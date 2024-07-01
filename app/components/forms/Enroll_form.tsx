"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "../../../utils/enroll-send-email";
import { toast } from "react-toastify";

export type FormData = {
  name: string;
  phonenumber: Number;
  email: string;
  classNumber: Number;
  dateOfBirth: string;
  previousSchool: string;
  address: string;
  gender: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
    toast.success("Your response has been sent");
  }

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg md:w-3/4 lg:w-1/2">
        <h1 className="text-center text-3xl pb-10 font-bold text-cyan-500">
          Enroll Now!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("name", { required: true })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              maxLength={10}
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("phonenumber", { required: true })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("email", { required: true })}
            />
            <select
              id="class"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("classNumber", { required: true })}
            >
              <option value="">Select your class</option>
              <option value="Lkg">LKG</option>
              <option value="Ukg">UKG</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-300 dark:invert"
              {...register("dateOfBirth", { required: true })}
            />
            <input
              type="text"
              placeholder="Previous School"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("previousSchool", { required: true })}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("address", { required: true })}
            />
            <select
              id="gender"
              className="w-full h-14 rounded-md border border-gray-300 bg-slate-300 py-3 px-4 text-lg placeholder:text-gray-800 text-gray-900 outline-none focus:border-purple-500 transition duration-30"
              {...register("gender", { required: true })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300">
              Enroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
