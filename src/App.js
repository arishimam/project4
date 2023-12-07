import Auth from "Auth";
import CommentsSection from "CommentsSection";
import PhotoGallery from "PhotoGallery";
import PhotoUploadForm from "PhotoUploadForm";

export default function App() {
  return (
    <>
      <Auth />
      <PhotoUploadForm />
      <PhotoGallery />
      <CommentsSection />
    </>
  );
}
