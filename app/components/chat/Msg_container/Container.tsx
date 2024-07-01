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
      const email = localStorage.getItem("email");
      if (email) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();
        if (error) {
          console.error("Error fetching user:", error);
        } else if (data) {
          setUser(data);
          console.log("User data fetched:", data); // Debug: log user data
        } else {
          console.log("No user data found for email:", email);
        }
      } else {
        console.log("No email found in localStorage");
      }
    };
    fetchUserData();
  }, []);

  const fetchMessages = async () => {
    if (!user) {
      console.warn("User data is missing");
      return;
    }

    const { name, className, div } = user;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("Username", name)
      .eq("className", className)
      .eq("div", div)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
    } else if (data) {
      setMessages(data);
      console.log("Messages fetched:", data); // Debug: log fetched messages
    } else {
      console.log("No messages found");
    }
  };

  useEffect(() => {
    // Fetch initial messages when component mounts
    fetchMessages();

    // Set up real-time subscription to messages table
    const messageChannel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          // When a new message is inserted, update messages state
          setMessages((prevMessages) => [payload.new, ...prevMessages]);
          console.log("New message received!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [user]); // Added user to dependency array to refetch messages when user data changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!user) {
      console.warn("User data is missing");
      return;
    }

    if (inputValue.trim() === "") {
      console.warn("Input value is empty");
      return;
    }

    if (selectedMessageId) {
      // Handle reply
      const { error: updateError } = await supabase
        .from("messages")
        .update({ reply: inputValue })
        .eq("id", selectedMessageId)
        .neq("user_id", user.id);

      if (updateError) {
        toast.error("Error sending reply");
        console.error("Error sending reply:", updateError);
      } else {
        console.log("Reply sent");
        setSelectedMessageId(null); // Deselect the message
        fetchMessages(); // Refresh messages
      }
    } else {
      // Handle new message
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
      } else if (data) {
        console.log("Message stored:", data);
        setMessages((prevMessages) => [data[0], ...prevMessages]);
      }
    }

    // Clear the input field
    setInputValue("");
  };

  return (
    <section className="p-6 h-screen flex flex-col justify-between">
      <div className="flex-grow flex flex-col-reverse overflow-y-auto max-h-[35rem]">
        {messages.map((message) => (
          <div key={message.id} className="my-2">
            <div
              className={`flex ${
                message.user_id === user?.id ? "justify-end" : "justify-start"
              } px-2`}
            >
              <div
                className={`p-3 w-auto max-w-xs text-xl md:max-w-sm lg:max-w-md rounded-l-xl rounded-br-xl ${
                  message.user_id === user?.id
                    ? "bg-yellow-500 text-white text-right"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => {
                  if (message.user_id !== user?.id) {
                    setSelectedMessageId(message.id);
                  }
                }}
              >
                {message.message}
              </div>
            </div>
            {message.reply && (
              <div className="flex justify-start px-2 mt-2">
                <div className="bg-purple-600 text-xl text-white rounded-r-xl rounded-bl-xl p-3 max-w-xs md:max-w-sm lg:max-w-md">
                  {message.reply}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
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
            className="flex-grow rounded-lg bg-gray-200 pl-4 w pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg text-lg bg-indigo-600 text-white px-4 py-2 ml-2 hover:bg-indigo-700 transition duration-300"
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
