import React, { useState, useRef } from "react";
import {
  HiOutlineDocumentText,
  HiOutlineX,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { IoIosClose } from "react-icons/io";

const ResumeUpload = ({ EditResumeModelShow }) => {
  const [resumeFileName, setResumeFileName] = useState("");
  const resumeInputRef = useRef(null);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please select a PDF or Word document");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setResumeFileName(file.name);
  };

  const removeResume = () => {
    setResumeFileName("");
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  };

  return (
    <div className="space-y-2 bg-white p-3 rounded-3xl">
      <button
        className="text-4xl relative left-[460px] text-gray-600 hover:text-black"
        onClick={() => EditResumeModelShow(false)}
      >
        <IoIosClose />
      </button>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Resume/CV
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="resume-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            resumeFileName
              ? "border-blue-300 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          } transition-colors duration-200`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            {resumeFileName ? (
              <>
                <HiOutlineDocumentText className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm font-medium text-gray-700 text-center truncate max-w-xs">
                  {resumeFileName}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeResume();
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 flex items-center"
                >
                  <HiOutlineX className="h-4 w-4 mr-1" />
                  Remove file
                </button>
              </>
            ) : (
              <>
                <HiOutlineCloudUpload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF or Word (Max 5MB)
                </p>
              </>
            )}
          </div>
          <input
            ref={resumeInputRef}
            id="resume-upload"
            type="file"
            onChange={handleResumeChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </label>
      </div>
      <div className="flex gap-2 justify-center mt-4">
        <button className="bg-green-500 p-2 rounded-lg text-white">
          Update
        </button>
        <button
          className="bg-slate-300 p-2 rounded-lg"
          onClick={() => EditResumeModelShow(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResumeUpload;
