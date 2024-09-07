import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  className: string;
  name: string;
  div: string;
}

export default function RegistrationModal() {
  const [user, setUser] = useState<User | null>(null);
  const [disabledButtons, setDisabledButtons] = useState<number[]>([]);

  const items = [
    { id: 901, name: "Chithra Rachana - Pencil" },
    { id: 902, name: "Chithra Rachana - Water Colour" },
    { id: 903, name: "Chithra Rachana - Oil Colour" },
    { id: 904, name: "Cartoon" },
    { id: 905, name: "Collage" },
    { id: 906, name: "Sasthreeya Sangeetham(Boys)" },
    { id: 907, name: "Sasthreeya Sangeetham(Girls)" },
    { id: 908, name: "Lalithaganam (Boys)" },
    { id: 909, name: "Lalithaganam (Girls)" },
    { id: 910, name: "Mappilappattu (Boys)" },
    { id: 911, name: "Mappilappattu (Girls)" },
    { id: 912, name: "Kathakali Sangeetham (Boys)" },
    { id: 913, name: "Kathakali Sangeetham (Girls)" },
    { id: 914, name: "Clarinet / Bugle" },
    { id: 915, name: "Nadaswaram" },
    { id: 916, name: "Violin - Western" },
    { id: 917, name: "Violin - Oriental" },
    { id: 918, name: "Guitar - Western" },
    { id: 919, name: "Odakkuzhal" },
    { id: 920, name: "Veena / Vichithraveena" },
    { id: 921, name: "Triple / Jazz - Western" },
    { id: 922, name: "Chenda / Thayambaka" },
    { id: 923, name: "Mrundangam" },
    { id: 924, name: "Madhalam" },
    { id: 925, name: "Thabala" },
    { id: 926, name: "Ottanthullal" },
    { id: 928, name: "Kathakali" },
    { id: 930, name: "Nadodi Nrutham" },
    { id: 932, name: "Bharathanatyam (Boys)" },
    { id: 933, name: "Bharathanatyam (Girls)" },
    { id: 934, name: "Kuchuppudi (Boys)" },
    { id: 935, name: "Kuchuppudi (Girls)" },
    { id: 936, name: "Chakyarkoothu (Boys)" },
    { id: 937, name: "Keralanadanam" },
    { id: 938, name: "Mohiniyattam (Girls)" },
    { id: 939, name: "Prasangam - Malayalam" },
    { id: 940, name: "Prasangam - English" },
    { id: 941, name: "Prasangam - Hindi" },
    { id: 942, name: "Prasangam - Urdu" },
    { id: 943, name: "Prasangam - Sanskrit" },
    { id: 944, name: "Upanyasam - Malayalam" },
    { id: 945, name: "Upanyasam - English" },
    { id: 946, name: "Upanyasam - Arabic" },
    { id: 947, name: "Upanyasam - Sanskrit" },
    { id: 948, name: "Upanyasam - Hindi" },
    { id: 949, name: "Upanyasam - Urdu" },
    { id: 950, name: "Katharachana - Malayalam" },
    { id: 951, name: "Katharachana - English" },
    { id: 952, name: "Katharachana - Hindi" },
    { id: 953, name: "Katharachana - Arabic" },
    { id: 954, name: "Katharachana - Sanskrit" },
    { id: 955, name: "Katharachana - Urdu" },
    { id: 956, name: "Kavitharachana - Malayalam" },
    { id: 957, name: "Kavitharachana - English" },
    { id: 958, name: "Kavitharachana - Hindi" },
    { id: 959, name: "Kavitharachana - Arabic" },
    { id: 960, name: "Kavitharachana - Sanskrit" },
    { id: 961, name: "Kavitharachana - Urdu" },
    { id: 962, name: "Padyam Chollal - Malayalam" },
    { id: 963, name: "Padyam Chollal - English" },
    { id: 964, name: "Padyam Chollal - Hindi" },
    { id: 965, name: "Padyam Chollal - Arabic" },
    { id: 966, name: "Padyam Chollal - Sanskrit" },
    { id: 967, name: "Padyam Chollal - Urdu" },
    { id: 968, name: "Padyam Chollal - Tamil" },
    { id: 969, name: "Padyam Chollal - Kannada" },
    { id: 970, name: "Aksharaslokam" },
    { id: 971, name: "Kavyakeli" },
    { id: 972, name: "Mono Act (Boys)" },
    { id: 973, name: "Mono Act (Girls)" },
    { id: 974, name: "Mimicry" },
    { id: 976, name: "Kathaprasangam" },
  ];
  const supabase = createClientComponentClient();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      const fetchUser = async () => {
        try {
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", userEmail)
            .single();

          if (error) throw error;
          setUser(userData);
        } catch (error) {
          console.log("error occurred", error);
        }
      };
      fetchUser();
    }
  }, [supabase]);

  const handleRegister = async (itemName: string) => {
    if (!user) {
      console.error("No user logged in");
      return;
    }

    try {
      const { data, error } = await supabase.from("Registrations").insert([
        {
          name: user.name,
          class: user.className,
          div: user.div,
          event_name: itemName,
        },
      ]);

      if (error) throw error;
      toast.success("Successfully registered");
    } catch (error) {
      toast.error("Error during registration");
    }
  };

  return (
    <section className="fixed flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg h-[600px] overflow-hidden">
        <div className="h-full overflow-y-auto p-6">
          <h1 className="text-xl font-semibold mb-4 text-center">
            Register for Events
          </h1>
          {items.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-4 border border-gray-300 rounded-lg flex gap-4 justify-between items-center"
            >
              <h2 className="text-[18px] font-semibold">{item.name}</h2>
              <button
                onClick={() => handleRegister(item.name)}
                disabled={disabledButtons.includes(item.id)}
                className={`text-white py-2 px-4 text-sm rounded bg-gradient-to-r from-blue-950 to-blue-500 hover:bg-gradient-to-r hover:from-cyan-950 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  disabledButtons.includes(item.id) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {disabledButtons.includes(item.id) ? "Registered" : "Register"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
