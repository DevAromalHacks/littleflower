"use client";

import React, { useState, DragEvent, ChangeEvent, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

interface UploadImageProps {
  onClose: () => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files
      ? event.dataTransfer.files[0]
      : null;
    setFile(droppedFile);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://five5ff0318-1333-46b2-8f7a.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      if (data.secure_url) {
        const { error } = await supabase.from('Upload').insert([
          { title: title, secure_url: data.secure_url }
        ]);

        if (error) {
          throw error;
        }

        toast.success('Upload successful');
      }
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  return (
    <section className="p-4 border-teal-shad bg-slate-800 rounded-lg shadow-md">
      <div className="w-full h-full text-slate-200">
        <h1 className="text-xl font-bold mb-4 text-slate-200">
          Upload Your Image
        </h1>
        <div className="bg-gray-300 rounded-lg">
          <div
            className="border-dashed border-2 border-stone-800 p-4 w-96 h-72 rounded-lg text-center mb-4 cursor-pointer flex flex-col items-center justify-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {file ? (
              <p className="text-stone-600">{file.name}</p>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="currentColor"
                  className="bi bi-cloud-arrow-down mb-2"
                  viewBox="0 0 16 16"
                  style={{ color: "rgb(177, 176, 165)" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                    fill="#b1b0a5"
                  />
                  <path
                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                    fill="#b1b0a5"
                  />
                </svg>
                <p className="text-gray-500">Drag and drop your image</p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              id="fileInput"
            />
          </div>
        </div>
        <div className="pb-4">
          <label htmlFor="Title" className="text-xl">
            Title
          </label>
          <input
            type="text"
            placeholder="Add a title for image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-gray-800 h-10 rounded-md text-xl pl-2 bg-gray-300 border border-sky-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <label
          htmlFor="fileInput"
          className="inline-block mb-4 mr-2 bg-teal-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          <span>Browse</span> <FontAwesomeIcon icon={faFolderOpen} />
        </label>
        <button
          onClick={handleUpload}
          className="bg-cyan-800 text-white px-4 py-2 rounded"
        >
          <span>Upload</span> <FontAwesomeIcon icon={faCloudArrowUp} />
        </button>
        <ToastContainer />
      </div>
    </section>
  );
};

export default UploadImage;
