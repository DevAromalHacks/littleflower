import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const supabase = createClientComponentClient();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userDateOfBirth, setUserDateOfBirth] = useState<string>("");
  const [userTalent, setUserTalent] = useState<string>("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      // Fetch user details based on userEmail from Supabase
      fetchUserData(email);
    }
  }, []);

  const fetchUserData = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name, date_of_birth, talent")
        .eq("email", email)
        .single();

      if (error) {
        toast.error("Error fetching user data");
      } else if (data) {
        setUserName(data.name || "");
        setUserDateOfBirth(data.date_of_birth || "");
        setUserTalent(data.talent || "");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error fetching user data:", error.message);
      toast.error("Error fetching user data");
    }
  };

  const updateUserDetails = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({
          name: userName,
          date_of_birth: userDateOfBirth,
          talent: userTalent,
        })
        .eq("email", userEmail);

      if (error) {
        toast.error("Error updating user details");
      } else {
        toast.success("User details updated successfully");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Error updating user details:", error.message);
      toast.error("Error updating user details");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <p className="text-gray-800">{userEmail}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="text"
          value={userDateOfBirth}
          onChange={(e) => setUserDateOfBirth(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Talent</label>
        <input
          type="text"
          value={userTalent}
          onChange={(e) => setUserTalent(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <button
        onClick={updateUserDetails}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
}
