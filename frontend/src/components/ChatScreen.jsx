import React, { useState } from "react";

const ChatScreen = ({ activeChat, setUploadedPDFs }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!activeChat || !input.trim()) return;

    try {
      // Send query to the API
      const response = await fetch("/api/send-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: activeChat.id, query: input }),
      });

      const result = await response.json();

      // Update chat messages
      setUploadedPDFs((prev) =>
        prev.map((chat) =>
          chat.id === activeChat.id
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { text: input, fromUser: true },
                  { text: result.answer, fromUser: false },
                ],
              }
            : chat
        )
      );

      setInput("");
    } catch (error) {
      console.error("Error sending query:", error);
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
      <h2 className="text-xl font-semibold p-4 border-b">{activeChat.name}</h2>
      <div className="flex-1 overflow-y-auto p-4">
        {activeChat.messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded ${
              msg.fromUser ? "bg-blue-100 text-blue-800 self-end" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t">
        <input
          type="text"
          className="flex-1 border rounded-l px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
