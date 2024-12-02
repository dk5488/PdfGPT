import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import { apiConnector } from "../services/apiConnector";
import { useSelector } from "react-redux";

const App = () => {
  const [uploadedPDFs, setUploadedPDFs] = useState([]); // List of uploaded PDFs
  const [activeChat, setActiveChat] = useState(null); // Active PDF chat
  const token = useSelector((state) => state.setter.value);

  const handlePDFUpload = async (pdfFile) => {
    try {
      // Call API to upload the PDF
      const formData = new FormData();
      formData.append("file", pdfFile);

      console.log("token before request::", token);
      console.log("Headers sent:", {
        Authorization: `Bearer ${token}`,
      });

      const response = await apiConnector("POST", "/pdf/upload", formData, {
        Authorization: `Bearer ${token}`, // Remove the nested headers object
      });
      console.log("Headers sent:", {
        Authorization: `Bearer ${token}`,
      });
      console.log("Upload response: ", response);

      //const result = await response.json();
      console.log("pdf id::",response.pdfDetails.id)
      const newChat = { id: response.pdfDetails.id, name: pdfFile.name, messages: [] };
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
