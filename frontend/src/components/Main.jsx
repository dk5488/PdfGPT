import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import { apiConnector } from "../services/apiConnector";
import { useSelector } from "react-redux";

const App = () => {
  const [uploadedPDFs, setUploadedPDFs] = useState([]); // List of uploaded PDFs
  const [activeChat, setActiveChat] = useState(null); // Active PDF chat
  const token = localStorage.getItem("authToken");

  // Fetch PDFs only once on page load
  useEffect(() => {
    const fetchUploadedPDFs = async () => {
      try {
        if (!token) return; // Exit if no token is available

        const response = await apiConnector("GET", "/pdf/latest", null, {
          Authorization: `Bearer ${token}`,
        });

        console.log("Latest pdfs::",response)
        
        setUploadedPDFs(response.pdfs || []);
        if (response.pdfs?.length > 0) {
          setActiveChat(response.pdfs[0].id); // Set the first PDF as active chat by default
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchUploadedPDFs();
  }, [token]); // Only run on token change (login/logout)

  const handlePDFUpload = async (pdfFile) => {
    try {
      // Call API to upload the PDF
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await apiConnector("POST", "/pdf/upload", formData, {
        Authorization: `Bearer ${token}`,
      });

      // Dynamically update state without making another GET request
      const newChat = {
        id: response.pdfDetails.id,
        name: pdfFile.name,
        messages: [],
      };
      setUploadedPDFs((prev) => [...prev, newChat]);
      setActiveChat(newChat.id); // Set the newly uploaded PDF as active chat
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
