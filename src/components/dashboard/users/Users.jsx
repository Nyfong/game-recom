"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import UserTable from "./UserTable";
import UserModal from "./UserModal";

const API_BASE_URL = "https://backend-apigame.onrender.com/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser({ ...user });
    setIsAddMode(false);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser({
      username: "",
      email: "",
      password: "",
    });
    setIsAddMode(true);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      // Basic validation
      if (!selectedUser.username || !selectedUser.email || (isAddMode && !selectedUser.password)) {
        throw new Error("All fields are required");
      }

      const userData = {
        username: selectedUser.username,
        email: selectedUser.email,
        ...(isAddMode && { password: selectedUser.password }),
      };

      const response = await fetch(
        isAddMode
          ? `${API_BASE_URL}/register`
          : `${API_BASE_URL}/users/${selectedUser._id}`,
        {
          method: isAddMode ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isAddMode ? "add" : "update"} user`);
      }

      await fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to delete user");
      }
      await fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          <PlusCircle className="mr-2" /> Add New User
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {users.length ? (
          <UserTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        ) : (
          <p className="p-4">No users available.</p>
        )}
      </div>
      {isModalOpen && (
        <UserModal
          isAddMode={isAddMode}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleSave={handleSave}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Users;