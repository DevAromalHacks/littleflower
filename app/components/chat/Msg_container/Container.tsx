import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Supabase client
const supabase = createClientComponentClient();

export default function Msg_Container() {
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  // Fetch user data based on email stored in localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", userEmail)
          .single();
        if (error) {
          console.error("Error fetching user:", error);
        } else if (data) {
          setUser(data);
        }
      }
    };
    fetchUserData();
  }, []);

  // Fetch messages
  const fetchMessages = async () => {
    if (!user) return;

    const { name, className, div } = user;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("Username", name)
      .eq("className", className)
      .eq("div", div)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
  };

  // Polling logic to check for new messages every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 1000); // Check every 1 second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!user || inputValue.trim() === "") return;

    if (selectedMessageId) {
      const { error } = await supabase
        .from("messages")
        .update({ reply: inputValue })
        .eq("id", selectedMessageId)
        .neq("user_id", user.id);

      if (error) {
        toast.error("Error sending reply");
      } else {
        setSelectedMessageId(null);
        fetchMessages();
      }
    } else {
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            user_id: user.id,
            message: inputValue,
            created_at: new Date().toISOString(),
            Username: user.name,
            className: user.className,
            div: user.div,
          },
        ])
        .select();

      if (error) {
        console.error("Error storing message:", error);
      } else {
        setMessages((prevMessages) => [data[0], ...prevMessages]);
      }
    }
    setInputValue("");
  };

  return (
    <section className="h-screen flex flex-col">
      <header className="grad-anime bg-gradient-to-l from-blue-950 to-blue-600 w-full h-36 rounded-lg flex items-center justify-between px-6 shadow-lg z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="text-blue-600 text-2xl"
            />
          </div>
          <h1 className="text-white text-2xl font-bold tracking-wider">
            LF support
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-gray-300 text-sm">Status: Online</span>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto p-4 max-h-[calc(100vh-5rem)]">
        {messages.map((message) => (
          <div key={message.id} className="my-2">
            <div
              className="flex items-end justify-end px-2"
            >
              <div
                className="p-3 w-auto max-w-xs text-xl md:max-w-sm lg:max-w-md rounded-l-xl rounded-br-xl bg-gradient-to-r from-blue-950 to-teal-800 text-white text-right"
                // onClick={() => {
                //   if (message.user_id !== user?.id) {
                //     setSelectedMessageId(message.id);
                //   }
                // }}
              >
                {message.message}
              </div>
            </div>
            {message.reply && (
              <div className="flex justify-start px-2 mt-2">
                <div className="bg-gradient-to-r from-cyan-950 to-blue-800 text-xl text-white rounded-r-xl rounded-bl-xl p-3 max-w-xs md:max-w-sm lg:max-w-md text-left">
                  {message.reply}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="py-10">
        <form
          className="flex items-center justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            placeholder="Type your message or reply..."
            className="flex-grow rounded-lg bg-transparent pl-4 w-full pr-4 py-2 text-lg border text-sky-300 border-blue-700 placeholder:text-sky-300"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg text-lg bg-gradient-to-r from-blue-950 to-blue-500 hover:bg-gradient-to-r text-white px-4 py-2 ml-2 hover:bg-indigo-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Send
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
