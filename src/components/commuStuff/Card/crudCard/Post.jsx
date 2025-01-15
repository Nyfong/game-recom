import React, { useState, useEffect } from 'react';
import { Menu, ImageIcon } from 'lucide-react';

const PlaceholderImage = ({ className }) => (
  <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
    <ImageIcon className="w-1/3 h-1/3 text-gray-400" />
  </div>
);

const ProfilePlaceholder = () => (
  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
    <svg
      className="w-6 h-6 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  </div>
);

const Post = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.content?.text || '');
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get the current user data from localStorage
    const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const trimmedText = editText.trim();
  
      if (!trimmedText) {
        throw new Error('Post text cannot be empty');
      }
  
      const updatedContent = {
        content: {
          ...post.content,
          text: trimmedText,
          media: post.content?.media || []
        },
        status: post.status,
        tags: post.tags || [],
        user: post.user || {
          id: userData?._id,
          profile: userData?.profile
        }
      };
  
      await onEdit(post._id, updatedContent);
      setIsEditing(false);
    } catch (error) {
      const errorMessage = error.message.includes("Failed to fetch")
        ? "Network error: Please check your internet connection."
        : `Error updating post: ${error.message}`;
      
      alert(errorMessage);
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(post._id);
    } catch (error) {
      const errorMessage = error.message.includes("Failed to fetch")
        ? "Network error: Please check your internet connection."
        : `Error deleting post: ${error.message}`;
      
      alert(errorMessage);
      console.error('Error deleting post:', error);
      setIsDeleting(false);
    }
  };

  // Use userData for current user information
  const isOwner = userData?._id === post.user?.id;

  // If this is a new post, use the current user's information
  const displayName = post.user?.profile?.name || userData?.profile?.name || 'Unknown User';
  const profileImageUrl = post.user?.profile?.profileImageUrl || userData?.profile?.profileImageUrl;
  
  // Format date, defaulting to current date for new posts
  const postDate = post.createdAt || new Date().toISOString();
  const formattedDate = new Date(postDate).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="relative w-10 h-10">
            {profileImageError || !profileImageUrl ? (
              <ProfilePlaceholder />
            ) : (
              <img
                src={profileImageUrl}
                alt={displayName}
                className="rounded-full object-cover w-full h-full"
                onError={() => setProfileImageError(true)}
              />
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{displayName}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Post menu"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 rounded-t-lg"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50 rounded-b-lg"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Post'}
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
            className="w-full p-3 border rounded-lg mb-3 min-h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mb-4 text-gray-800">{post.content?.text}</p>
      )}

      {post.content?.media?.length > 0 && (
        <div className="mb-4">
          {imageError ? (
            <PlaceholderImage className="w-full h-64 rounded-lg" />
          ) : (
            <img
              src={post.content.media[0].url}
              alt={post.content.media[0].altText || 'Post image'}
              className="w-full rounded-lg max-h-96 object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      )}

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