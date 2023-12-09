import React, { useState, useRef } from "react";
import pb from "lib/pocketbase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LibraryAdd from "@mui/icons-material/LibraryAdd";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import useLogout from "hooks/useLogout";

const PhotoUploadForm = ({ navigation }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);
  const logout = useLogout();

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
      navigation.navigate("Home");
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
    <>
      {
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="add"
                sx={{ mr: 2 }}
                onClick={() => navigation.navigate("Upload")}
              >
                <LibraryAdd />
              </IconButton>
              <Button
                color="inherit"
                sx={{ flexGrow: 1, justifyContent: "start" }}
                onClick={() => navigation.navigate("Home")}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Home
                </Typography>
              </Button>
              <Button color="inherit" type="submit" onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      }
      <br />
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
    </>
  );
};

export default PhotoUploadForm;
