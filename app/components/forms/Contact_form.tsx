"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "../../../utils/contact-send-email";

export type FormData = {
  name: string;
  phonenumber: Number;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 ">
        <h1 className="text-center text-3xl pb-8 font-bold text-cyan-500">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-14 rounded-md border border-gray-300 bg-white py-3 px-4 text-lg text-gray-700 outline-none focus:border-purple-500 transition duration-300"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              maxLength={10}
              className="w-full h-14 rounded-md border border-gray-300 bg-white py-3 px-4 text-lg text-gray-700 outline-none focus:border-purple-500 transition duration-300"
              {...register("phonenumber", { required: true })}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full h-14 rounded-md border border-gray-300 bg-white py-3 px-4 text-lg text-gray-700 outline-none focus:border-purple-500 transition duration-300"
              {...register("email", { required: true })}
            />
          </div>
          <div>
            <textarea
              rows={4}
              placeholder="Type your message"
              className="w-full h-40 resize-none rounded-md border border-gray-300 bg-white py-3 px-4 text-lg text-gray-700 outline-none focus:border-purple-500 transition duration-300"
              {...register("message", { required: true })}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button className="bg-teal-600  text-white font-semibold py-3 px-8 rounded-md transition duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
