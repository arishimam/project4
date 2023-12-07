import React, { useState } from "react";

const PhotoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // query to upload file to pocketbase here
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
