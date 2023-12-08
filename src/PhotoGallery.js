import pb from "lib/pocketbase";
import React, { useState, useEffect } from "react";

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
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          id={photo.id}
          photo={photo.photo}
          description={photo.description}
        />
      ))}
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
      <img src={imageUrl} />
      <p>{description}</p>
    </div>
  );
};
export default PhotoGallery;
