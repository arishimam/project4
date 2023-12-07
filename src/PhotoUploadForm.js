import React, { useState, useRef } from "react";
import pb from "lib/pocketbase";

const PhotoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("field", pb.authStore.model.id);
    // console.log(pb.authStore.model);
    formData.append("photo", file);
    formData.append("description", description);
    // formData.append("timestamp", "");

    try {
      const record = await pb.collection("photos").create(formData);

      console.log("Photo uploaded successfully!", record);
      setFile(null);
      setDescription("");
      alert("Photo Uploaded Successfully!");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading photo", error);
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUploadForm;
