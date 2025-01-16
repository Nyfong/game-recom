import React from "react";

const UserModal = ({
  isAddMode,
  selectedUser,
  setSelectedUser,
  handleSave,
  setIsModalOpen,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold mb-4">
        {isAddMode ? "Add New User" : "Edit User"}
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username *"
          value={selectedUser.username}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, username: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email *"
          value={selectedUser.email}
          onChange={(e) =>
            setSelectedUser({ ...selectedUser, email: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        {isAddMode && (
          <input
            type="password"
            placeholder="Password *"
            value={selectedUser.password}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, password: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        )}
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

export default UserModal;
