import React, { useState, useEffect } from "react";

const CommentsSection = ({ photoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // fetch comments for photo
  }, [photoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // post/submit comment to pocketbase
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post Comment</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsSection;
