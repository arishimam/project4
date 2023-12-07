import React, { useState, useEffect } from "react";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    // fetch photos form pocketbase here
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

const Photo = ({ imagePath, description }) => (
  <div className="photo">
    <img src={imagePath} />
    <p>{description}</p>
  </div>
);

export default PhotoGallery;
