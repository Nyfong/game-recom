"use client";

import React from "react";
import EditUserForm from "./EditUserForm";

const UserTable = ({
  users,
  isLoading,
  editingId,
  setEditingId,
  editUser,
  setEditUser,
  handleUpdateUser,
  handleDeleteUser,
}) => {
  const renderUserRow = (user) => (
    <tr key={user._id} className="border-b hover:bg-gray-50">
      <td className="p-4">
        {editingId === user._id ? (
          <input
            type="text"
            value={editUser.username}
            onChange={(e) =>
              setEditUser({
                ...editUser,
                username: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        ) : (
          user.username
        )}
      </td>
      <td className="p-4">
        {editingId === user._id ? (
          <input
            type="email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        ) : (
          user.email
        )}
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          {editingId === user._id ? (
            <>
              <button
                onClick={() => handleUpdateUser(user._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditingId(user._id);
                  setEditUser({
                    username: user.username,
                    email: user.email,
                  });
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 border-b">Username</th>
            <th className="text-left p-4 border-b">Email</th>
            <th className="text-left p-4 border-b w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No users found
              </td>
            </tr>
          ) : (
            users.map(renderUserRow)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;