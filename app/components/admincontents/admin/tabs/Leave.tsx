"use client"

import React, { useState } from 'react';

export default function Leave() {
  const [name, setName] = useState('');
  const [days, setDays] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Form submitted');
  };

  return (
    <section className="py-10 flex justify-center items-center">
      <div className="bg-white p-10 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Teacher's Leave Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full text-xl p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2" htmlFor="days">Number of Days</label>
            <input
              type="tel"
              id="days"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Number of days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2" htmlFor="reason">Reason for Leave</label>
            <textarea
              id="reason"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
              placeholder="Reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
