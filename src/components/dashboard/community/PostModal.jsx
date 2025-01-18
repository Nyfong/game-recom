import React, { useState } from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

const PostModal = ({ isAddMode, selectedPost, setSelectedPost, setImageFile, setIsModalOpen, handleSave }) => {
  const [tags, setTags] = useState(selectedPost.content.tags || []);

  const handleTagChange = (e) => {
    setTags(e.target.value.split(","));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-96">
        <h2 className="text-xl font-bold mb-4">
          {isAddMode ? "Add New Post" : "Edit Post"}
        </h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Post Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={
                    selectedPost.content.media &&
                    selectedPost.content.media.length > 0
                      ? selectedPost.content.media[0].url
                      : PLACEHOLDER_IMAGE
                  }
                  alt="Post Preview"
                  className="rounded-lg object-cover"
                  fill
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
          </div>
          <textarea
            placeholder="Post Content *"
            value={selectedPost.content.text}
            onChange={(e) =>
              setSelectedPost({
                ...selectedPost,
                content: { ...selectedPost.content, text: e.target.value },
              })
            }
            className="w-full p-2 border rounded"
            rows={3}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags.join(",")}
            onChange={handleTagChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-4">
            <button
              onClick={() => handleSave(tags)}
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 bg-gray-200 text-black p-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
