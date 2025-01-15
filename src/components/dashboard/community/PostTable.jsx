import React from "react";
import { Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

const PLACEHOLDER_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

const PostTable = ({ posts, handleEdit, handleDelete, handleApprove, handleDisapprove }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="p-3">Profile</th>
          <th className="p-3">Username</th>
          <th className="p-3">Content</th>
          <th className="p-3">Media</th>
          <th className="p-3">Likes</th>
          <th className="p-3">Comments</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id} className="border-b hover:bg-gray-50">
            <td className="p-3">
              <div className="w-10 h-10 relative">
                <Image
                  src={post.user.profile.profileImageUrl || PLACEHOLDER_IMAGE}
                  alt="Profile"
                  className="rounded-full object-cover"
                  fill
                />
              </div>
            </td>
            <td className="p-3">{post.user.username}</td>
            <td className="p-3">{post.content.text}</td>
            <td className="p-3">
              {post.content.media && post.content.media.length > 0 && (
                <Image
                  src={post.content.media[0].url}
                  alt="Post Media"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              )}
            </td>
            <td className="p-3">{post.status.likes}</td>
            <td className="p-3">{post.status.comments.length}</td>
            <td className="p-3 flex space-x-2">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit />
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 />
              </button>
              <button
                onClick={() => handleApprove(post._id)}
                className="text-green-500 hover:text-green-700"
              >
                <CheckCircle />
              </button>
              <button
                onClick={() => handleDisapprove(post._id)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <XCircle />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PostTable;
