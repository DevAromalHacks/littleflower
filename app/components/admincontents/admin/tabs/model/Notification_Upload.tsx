"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { toast } from "react-toastify";

const supabase = createClientComponentClient();

export default function Notification_Upload() {
  const [formData, setFormData] = useState({
    class: "",
    div: "",
    msg: "",
    title: "",
    isPublic: false,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      let data, error;
      if (formData.isPublic) {
        ({ data, error } = await supabase.from("public").insert([
          {
            title: formData.title,
            msg: formData.msg,
          },
        ]));
      } else {
        ({ data, error } = await supabase.from("notification").insert([
          {
            msg: formData.msg,
            class: formData.class,
            div: formData.div,
            title: formData.title,
          },
        ]));
      }

      if (error) {
        throw error;
      }

      toast.success("Notification sent successfully!");
      setFormData({ class: "", div: "", msg: "", title: "", isPublic: false });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <FontAwesomeIcon icon={faBell} className="mr-2 text-yellow-500" />
          Push Notification
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="class" className="block text-sm font-medium mb-2">
              Type
            </label>
            <div className="relative">
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white text-sm appearance-none"
                required={!formData.isPublic}
                disabled={formData.isPublic}
              >
                <option value="">Select class</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
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
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-3 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="div" className="block text-sm font-medium mb-2">
              Division
            </label>
            <div className="relative">
              <select
                name="div"
                value={formData.div}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white text-sm appearance-none"
                required={!formData.isPublic}
                disabled={formData.isPublic}
              >
                <option value="">Select division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute right-3 top-3 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Add title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="msg" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="msg"
              name="msg"
              value={formData.msg}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white text-sm"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="public"
                name="isPublic"
                checked={formData.isPublic}
                onChange={() => setFormData({ ...formData, isPublic: true })}
                className="mr-2"
              />
              <label htmlFor="public" className="text-sm font-medium mr-4">
                Public
              </label>
              <input
                type="radio"
                id="private"
                name="isPublic"
                checked={!formData.isPublic}
                onChange={() => setFormData({ ...formData, isPublic: false })}
                className="mr-2"
              />
              <label htmlFor="private" className="text-sm font-medium">
                Division
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-yellow-500 text-gray-900 font-bold rounded-md flex items-center justify-center hover:bg-yellow-400 transition duration-200"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Push
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
