"use client";

import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

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
    "Content-Type": "application/json",
  };

  // Fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers,
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
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(editUser),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
      }
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
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete user");
      }
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete user. Please try again.");
    }
  };

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

      {isAddingUser && (
        <AddUserForm
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
          setIsAddingUser={setIsAddingUser}
        />
      )}

      <UserTable
        users={users}
        isLoading={isLoading}
        editingId={editingId}
        setEditingId={setEditingId}
        editUser={editUser}
        setEditUser={setEditUser}
        handleUpdateUser={handleUpdateUser}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default Users;