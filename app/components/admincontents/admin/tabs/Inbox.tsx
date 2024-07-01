"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Supabase client
const supabase = createClientComponentClient();

export default function Message() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [reply, setReply] = useState<string>("");

  // Function to fetch initial messages
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Error fetching messages");
      console.error("Error fetching messages:", error);
    } else if (data) {
      setMessages(data);
      console.log("Messages fetched:", data); // Debug: log fetched messages
    } else {
      toast.info("No messages found");
    }
  };

  useEffect(() => {
    // Fetch initial messages when component mounts
    fetchMessages();

    // Set up real-time subscription to messages table
    const messageChannel = supabase.channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        // When a new message is inserted, update messages state
        setMessages((prevMessages) => [payload.new, ...prevMessages]);
        toast.success("New message received!");
      })
      .subscribe();

    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, []);

  const handleReplySubmit = async (messageId: string) => {
    if (!reply.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    // Update the reply field of the selected message
    const { error: updateError } = await supabase
      .from("messages")
      .update({ reply: reply })
      .eq("id", messageId);

    if (updateError) {
      toast.error("Error sending reply");
      console.error("Error sending reply:", updateError);
    } else {
      toast.success("Reply sent");
      setReply(""); // Clear the reply input
      setSelectedMessageId(null); // Deselect the message
      // Fetch updated messages to reflect the new reply
      fetchMessages();
    }
  };

  return (
<section className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-lg rounded-lg shadow-lg p-4 flex flex-col h-[500px] bg-yellow-100">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">Inbox</h1>
    <div className="flex-grow overflow-y-auto max-h-80vh mb-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className="bg-lime-200 text-gray-800 rounded-lg p-4 my-4 cursor-pointer hover:shadow-md transition duration-300"
          onClick={() => setSelectedMessageId(message.id)}
        >
          <div className="max-h-40 overflow-y-auto">
            <strong className="text-lg font-semibold">{message.Username}:</strong> 
            <div className="mt-2">{message.message}</div>
          </div>
          {message.reply && (
            <div className="bg-teal-200 text-gray-800 rounded-lg p-2 mt-4">
              <strong className="text-lg font-semibold">Reply:</strong> {message.reply}
            </div>
          )}
          {selectedMessageId === message.id && (
            <div className="mt-4">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="border border-gray-300 text-gray-800 p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
                placeholder="Type your reply here"
              />
              <button
                onClick={() => handleReplySubmit(message.id)}
                className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 transition duration-300"
              >
                Send Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    <ToastContainer />
  </div>
</section>

  );
}
