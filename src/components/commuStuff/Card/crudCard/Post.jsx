// Post.js
"use client";
import React, { useState } from 'react';
import { FaEllipsisH, FaPencilAlt, FaTrash } from 'react-icons/fa';

const Post = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.content?.text || '');
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedContent = {
        content: {
          ...post.content,
          text: editText
        },
        status: post.status,
        tags: post.tags
      };

      await onEdit(post._id, updatedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await onDelete(post._id);
      } catch (error) {
        console.error('Error deleting post:', error);
        setIsDeleting(false);
      }
    }
  };

  const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null;
  const currentUserId = storedUser ? JSON.parse(storedUser)._id : null;
  const isOwner = currentUserId === post.user?.id;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img
            src={post.user?.profile?.profileImageUrl || 'https://via.placeholder.com/40'}
            alt={post.user?.profile?.name || 'User'}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{post.user?.profile?.name || 'Unknown User'}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisH />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100 rounded-t-lg"
                >
                  <FaPencilAlt className="mr-2" /> Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full px-4 py-2 text-left flex items-center text-red-500 hover:bg-gray-100 rounded-b-lg"
                >
                  <FaTrash className="mr-2" /> Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-4">{post.content?.text}</p>
      )}

      {post.content?.media?.map((media, index) => (
        <img
          key={media._id || index}
          src={media.url}
          alt={media.altText || 'Post image'}
          className="w-full rounded-lg mb-4 max-h-96 object-cover"
        />
      ))}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;