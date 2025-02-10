import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { format, subDays } from "date-fns";
import { motion } from "framer-motion";
import { Filter, Loader2 } from "lucide-react"; 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Reason {
  id: number;
  name: string;
  className: string;
  div: string;
  reason: string;
  created_at: string;
}

export default function ReasonsPage() {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [loading, setLoading] = useState(false); // Default: false
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedDate, setSelectedDate] = useState("today");
  const [customDate, setCustomDate] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchReasons = async (isFiltering = false) => {
      if (isFiltering) setLoading(true); // Show loader only on filtering

      let query = supabase.from("reason").select("*").order("created_at", { ascending: false });

      if (selectedClass) query = query.eq("className", selectedClass);
      if (selectedDiv) query = query.eq("div", selectedDiv);

      let dateFilter = new Date();
      if (selectedDate === "yesterday") dateFilter = subDays(new Date(), 1);
      else if (selectedDate === "lastWeek") dateFilter = subDays(new Date(), 7);
      else if (selectedDate === "custom" && customDate) dateFilter = new Date(customDate);

      query = query.gte("created_at", format(dateFilter, "yyyy-MM-dd"));

      const { data, error } = await query;
      if (error) console.error("Error fetching reasons:", error);
      else if (isMounted) setReasons(data || []);

      if (isFiltering) setLoading(false); // Hide loader after filter fetch
    };

    // Initial fetch
    fetchReasons(true); // Show loader only for first load

    // Auto-fetch every second (without loader)
    const autoFetch = () => {
      fetchReasons(false).then(() => {
        if (isMounted) setTimeout(autoFetch, 1000); // Recursively fetch every second
      });
    };

    autoFetch();

    return () => {
      isMounted = false;
    };
  }, [selectedClass, selectedDiv, selectedDate, customDate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-sky-400 mb-6">Absence Reasons</h1>

      {/* Filter Button */}
      <div className="absolute text-left">
        <button
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-yellow-400"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter />
        </button>

        {/* Filters Popup */}
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 left-0 w-64 bg-gray-800 shadow-lg rounded-lg p-4 z-50"
          >
            <select className="w-full bg-gray-700 p-2 rounded text-white mb-2" onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">All Classes</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
              ))}
            </select>

            <select className="w-full bg-gray-700 p-2 rounded text-white mb-2" onChange={(e) => setSelectedDiv(e.target.value)}>
              <option value="">All Divisions</option>
              <option value="A">Division A</option>
              <option value="B">Division B</option>
            </select>

            <select className="w-full bg-gray-700 p-2 rounded text-white mb-2" onChange={(e) => setSelectedDate(e.target.value)}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last Week</option>
              <option value="custom">Custom Date</option>
            </select>

            {selectedDate === "custom" && (
              <input type="date" className="w-full bg-gray-700 p-2 rounded text-white" onChange={(e) => setCustomDate(e.target.value)} />
            )}

            <button
              className="w-full mt-3 bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600"
              onClick={() => setFilterOpen(false)}
            >
              Apply Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Display Reasons */}
      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-sky-400 h-10 w-10" />
          </div>
        ) : reasons.length === 0 ? (
          <p className="text-center text-gray-400">No reasons found.</p>
        ) : (
          <div className="space-y-4">
            {reasons.map((reason) => (
              <div key={reason.id} className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <p className="text-lg font-semibold text-sky-300">
                  {reason.name} ({reason.className} {reason.div})
                </p>
                <p className="text-gray-300">{reason.reason}</p>
                <p className="text-sm text-gray-400 mt-2">
                  Submitted at: {new Date(reason.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}