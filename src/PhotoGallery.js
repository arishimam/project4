import pb from "lib/pocketbase";
import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LibraryAdd from '@mui/icons-material/LibraryAdd';
import AppBar from '@mui/material/AppBar';

function PhotoGallery({navitation}) {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch photos form pocketbase
    const fetchPhotos = async () => {
      try {
        const records = await pb.collection("photos").getFullList({
          sort: "-created",
        });
        setPhotos(records);
        console.log(records);
      } catch (error) {
        console.error("Error retrieving photos", error);
      }
      setIsLoading(false);
    };

    fetchPhotos();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="photo-gallery">
              <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{ mr: 2 }}
            //onPress={() => navigation.navigate('Details')}
          >
            <LibraryAdd />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <ImageList sx={{ width: 500}}>
        {photos.map((photo) => (
          <ImageListItem>
            <img
              key={photo.id}
              id={photo.id}
              src={`http://127.0.0.1:8090/api/files/photos/${photo.id}/${photo.photo}?w=248&fit=crop&auto=format`}
              alt={photo.description}
            />
            <ImageListItemBar
              title={photo.description}
              subtitle={<span>by: {photo.field}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

const Photo = ({ id, photo, description }) => {
  //   const imageUrl = `${process.env.REACT_APP_PB_URL}/api/collections/photos/records/${id}`;
  const imageUrl = `http://127.0.0.1:8090/api/files/photos/${id}/${photo}`;
  console.log(imageUrl);
  return (
    <div className="photo">
      {/* {console.log(photo)} */}
      <img
        srcSet={`${imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${imageUrl}?w=248&fit=crop&auto=format`}
      />
      <p>{description}</p>
    </div>
  );
};
export default PhotoGallery;
