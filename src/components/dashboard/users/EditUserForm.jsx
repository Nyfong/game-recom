
"use client";

import React from "react";

const EditUserForm = ({ editUser, setEditUser, handleUpdateUser, setEditingId }) => {
  return (
    <div className="flex flex-col space-y-4">
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
      <input
        type="email"
        value={editUser.email}
        onChange={(e) =>
          setEditUser({ ...editUser, email: e.target.value })
        }
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <button
          onClick={handleUpdateUser}
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
      </div>
    </div>
  );
};

export default EditUserForm;