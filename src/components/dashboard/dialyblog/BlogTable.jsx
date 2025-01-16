import React from "react";

const BlogTable = ({ blogs, handleEdit, handleDelete }) => (
  <table className="w-full text-sm text-left">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="p-3">Title</th>
        <th className="p-3">Paragraph</th>
        <th className="p-3">Image</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {blogs.map((blog) => (
        <tr key={blog._id} className="border-b hover:bg-gray-50">
          <td className="p-3">{blog.title}</td>
          <td className="p-3">{blog.paragraph}</td>
          <td className="p-3">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-20 h-20 object-cover"
            />
          </td>
          <td className="p-3 flex space-x-2">
            <button
              onClick={() => handleEdit(blog)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BlogTable;
