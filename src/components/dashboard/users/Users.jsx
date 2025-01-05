"use client";

import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editUser, setEditUser] = useState({ username: "", email: "" });

  const API_BASE_URL = "https://backend-apigame.onrender.com/api";
  
  const headers = {
    'Content-Type': 'application/json'
  };

  // Fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const handleAddUser = async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers,
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setIsAddingUser(false);
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      setError(error.message || "Failed to add user. Please try again.");
    }
  };

  // Update user
  const handleUpdateUser = async (id) => {
    setError(null);
    try {
      // Changed endpoint to match the likely backend route
      const response = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(editUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEditingId(null);
      setEditUser({ username: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.message || "Failed to update user. Please try again.");
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletegame/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete game");
      }
      await fetchGames();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <button
          onClick={() => setIsAddingUser(true)}
          disabled={isAddingUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          Add User
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

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
            {isAddingUser && (
              <tr className="border-b">
                <td className="p-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
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
                </td>
              </tr>
            )}
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
    </div>
  );
};

export default Users;