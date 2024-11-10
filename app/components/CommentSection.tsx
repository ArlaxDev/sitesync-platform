import React, { useState } from "react";

const CommentSection = ({ featureId }: { featureId: any }) => {
  // Initial comments state
  const [comments, setComments] = useState([
    { id: 1, text: "This is the first comment." },
    { id: 2, text: "This is the second comment." },
  ]);

  // State for new comment input
  const [newComment, setNewComment] = useState("");

  // Function to add a new comment
  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(), // Unique ID based on timestamp
        text: newComment,
      };
      setComments([...comments, newCommentObj]);
      setNewComment(""); // Clear the input field
    }
  };

  // Function to delete a comment by ID
  const deleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-800">Comments</h4>

      {/* List of Comments */}
      <ul className="space-y-2 mt-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
            <span>{comment.text}</span>
            <button
              onClick={() => deleteComment(comment.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Comment Input Field */}
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={addComment}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
