import React, { useState } from "react";
import { apiConnector } from "../services/apiConnector";

const ChatScreen = ({ activeChat, setUploadedPDFs }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); 
  const token = localStorage.getItem("authToken");

  const handleSendMessage = async () => {
    if (!activeChat || !input.trim()) return;

    try {
      setLoading(true); // Show loading indicator
      const response = await apiConnector(
        "POST",
        "/pdf/ask",
        { pdfId: activeChat.id, question: input }, 
        {
          Authorization: `Bearer ${token}`,
        }
      );

      const { answer } = response; // Destructure answer from the response

      // Update chat messages
      setUploadedPDFs((prev) =>
        prev.map((chat) =>
          chat.id === activeChat.id
            ? {
                ...chat,
                messages: [
                  ...(chat.messages || []), // Default to an empty array if messages are undefined
                  { text: input, fromUser: true },
                  { text: answer, fromUser: false },
                ],
              }
            : chat
        )
      );

      setInput(""); // Clear the input field
    } catch (error) {
      console.error("Error sending query:", error);
      alert("Failed to send the message. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select or upload a PDF to start a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Chat Header */}
      <h2 className="text-xl font-semibold p-4 border-b">{activeChat.name}</h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {(activeChat.messages || []).map((msg, index) => (
          <div
            key={index}
            className={`max-w-lg p-3 rounded shadow ${
              msg.fromUser
                ? "bg-blue-100 text-blue-800 self-end"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex p-4 border-t">
        <input
          type="text"
          className="flex-1 border rounded-l px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={loading} // Disable input while loading
        />
        <button
          onClick={handleSendMessage}
          className={`px-4 py-2 rounded-r ${
            loading
              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
