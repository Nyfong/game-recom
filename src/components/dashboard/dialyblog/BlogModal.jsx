import React from "react";

const BlogModal = ({
  isAddMode,
  selectedBlog,
  setSelectedBlog,
  handleSave,
  setIsModalOpen,
  handleImageChange,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">
        {isAddMode ? "Add New Blog" : "Edit Blog"}
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title *"
          value={selectedBlog.title}
          onChange={(e) =>
            setSelectedBlog({ ...selectedBlog, title: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Paragraph *"
          value={selectedBlog.paragraph}
          onChange={(e) =>
            setSelectedBlog({ ...selectedBlog, paragraph: e.target.value })
          }
          className="w-full p-2 border rounded"
          rows={5}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Blog Image
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative">
              {selectedBlog.image ? (
                <img
                  src={selectedBlog.image}
                  alt="Blog Preview"
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
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

export default BlogModal;
