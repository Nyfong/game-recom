
"use client";

import React from "react";

const AddUserForm = ({ newUser, setNewUser, handleAddUser, setIsAddingUser }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Add New User</h3>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsAddingUser(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;