"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "../../../utils/complaint-send-email";
import { toast } from "react-toastify";

export type FormData = {
  name: string;
  phonenumber: Number;
  email: string;
  message: string;
  classNumber: Number;
  division: Number;
};

const ComplaintForm: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
    toast.success("Your response has been sent");
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div>
          <h1 className="text-center text-3xl pb-10 font-bold text-red-700 text-shadow-orange">
            Register Complaint !
          </h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="flex items-center justify-center">
                  <div>
                    <div className="pb-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="contact-inp w-80 h-10 rounded-md border border-gray-300 bg-white py-3 pl-2 pr-2 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        maxLength={10}
                        className="contact-inp w-80 h-10 rounded-md border border-gray-300 bg-white py-3 pl-2 pr-2 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        {...register("phonenumber", { required: true })}
                      />
                    </div>
                    <div className="pb-4">
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="contact-inp w-80 h-10 rounded-md border border-gray-300 bg-white py-3 pl-2 pr-2 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        {...register("email", { required: true })}
                      />
                    </div>
                    <div className="pb-4 flex gap-4">
                      <select
                        id="class"
                        className="w-56 h-10 text-black rounded-md complaint-select pl-2 pr-2"
                        {...register("classNumber", { required: true })}
                      >
                        <option value="Select your class">
                          Select your class
                        </option>
                        <option value="Lkg">Lkg</option>
                        <option value="Ukg">ukg</option>
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
                        id="class"
                        className="w-20 h-10 text-black rounded-md complaintdiv-select pl-2 pr-2"
                        {...register("division", { required: true })}
                      >
                        <option value="Div">Div</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                    <div className="pb-4">
                      <textarea
                        rows={4}
                        placeholder="Type your message"
                        className=" contact-text w-80  resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                        {...register("message", { required: true })}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-red-700 py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
