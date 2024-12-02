import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatScreen from "./components/ChatScreen";

const App = () => {
  const [uploadedPDFs, setUploadedPDFs] = useState([]); // List of uploaded PDFs
  const [activeChat, setActiveChat] = useState(null); // Active PDF chat

  const handlePDFUpload = async (pdfFile) => {
    try {
      // Call API to upload the PDF
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const newChat = { id: result.id, name: pdfFile.name, messages: [] };
      setUploadedPDFs((prev) => [...prev, newChat]);
      setActiveChat(newChat.id);
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar onPDFUpload={handlePDFUpload} />
      <div className="flex flex-1">
        <Sidebar
          uploadedPDFs={uploadedPDFs}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatScreen
          activeChat={uploadedPDFs.find((chat) => chat.id === activeChat)}
          setUploadedPDFs={setUploadedPDFs}
        />
      </div>
    </div>
  );
};

export default App;
