"use client";

import React from "react";

const UserTable = ({ users, handleEdit, handleDelete }) => (
  <table className="w-full text-sm text-left">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="p-3">Username</th>
        <th className="p-3">Email</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id} className="border-b hover:bg-gray-50">
          <td className="p-3">{user.username}</td>
          <td className="p-3">{user.email}</td>
          <td className="p-3 flex space-x-2">
            <button
              onClick={() => handleEdit(user)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user._id)}
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

export default UserTable;