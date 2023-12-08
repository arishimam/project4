import pb from "lib/pocketbase";
import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const PhotoGallery = () => {
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
      <ImageList sx={{ width: 500, height: 450 }}>
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
