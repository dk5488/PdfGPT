import React from "react";

const Navbar = ({ onPDFUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onPDFUpload(file); // Pass the file object to parent
    }
  };

  return (
    <div className="bg-blue-600 text-white flex items-center justify-between p-4">
      <h1 className="text-lg font-bold">LLM PDF Q&A</h1>
      <label
        htmlFor="upload-pdf"
        className="flex items-center bg-blue-700 px-4 py-2 rounded cursor-pointer hover:bg-blue-800"
      >
        Upload PDF
        <input
          type="file"
          id="upload-pdf"
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default Navbar;
