"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ReasonPage() {
  const params = useParams();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Ensure values are always strings
  const name = params.name ? decodeURIComponent(String(params.name)) : "Unknown";
  const className = params.className ? decodeURIComponent(String(params.className)) : "Unknown";
  const div = params.div ? decodeURIComponent(String(params.div)) : "Unknown";
  const phone = params.phone ? decodeURIComponent(String(params.phone)) : "Unknown";

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setMessage("Please enter a reason.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await supabase
      .from("reason")
      .insert([
        {
          name,
          className,
          div,
          phone,
          reason,
        },
      ]);

      if (error) throw error;
      
      setMessage("Reason submitted successfully!");
      setReason(""); // Clear textarea
    } catch (error) {
      setMessage(`Failed to submit. Please try again., ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-md text-center border border-white/20">
        <h1 className="text-2xl font-extrabold text-sky-400">
          Absence Reason for {name}
        </h1>
       
        <textarea
          className="w-full mt-6 p-3 bg-gray-900 border border-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Enter your reason..."
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {message && (
          <p className="mt-2 text-sm text-sky-400">{message}</p>
        )}

        <button
          className={`mt-6 w-full ${
            loading ? "bg-gray-600 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
          } text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Reason"}
        </button>
      </div>
    </div>
  );
}
