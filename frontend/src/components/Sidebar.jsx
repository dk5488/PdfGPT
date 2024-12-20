import React from "react";

const Sidebar = ({ uploadedPDFs, activeChat, setActiveChat }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 border-r">
      <h2 className="font-semibold text-lg mb-4">Uploaded PDFs</h2>
      <ul>
        {uploadedPDFs.map((pdf) => (
          <li
            key={pdf.id}
            className={`p-2 cursor-pointer rounded flex items-center ${
              pdf.id === activeChat
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveChat(pdf.id)}
            style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} 
            title={pdf.filename} 
          >
            {pdf.filename}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
