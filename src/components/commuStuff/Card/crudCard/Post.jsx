import React, { useState, useEffect } from 'react';
import { Menu, ImageIcon, ThumbsUp, MessageSquare } from 'lucide-react';

const ProfilePlaceholder = () => (
  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
    <span className="text-gray-500">U</span>
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
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState('');

  // Initialize user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // Initialize likes from post data
  useEffect(() => {
    if (post.likes) {
      setLikes(Array.isArray(post.likes) ? post.likes : []);
    }
  }, [post.likes]);

  // Check if current user has liked the post
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const hasLiked = Array.isArray(likes) && likes.some(
        like => typeof like === 'object' && like.userId === user._id
      );
      setIsLiked(hasLiked);
    }
  }, [likes]);

  const handleLike = async () => {
    if (!userData?._id || isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userData._id}/likes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: post._id }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to like post');
      }

      const updatedLikes = await response.json();
      setLikes(Array.isArray(updatedLikes) ? updatedLikes : []);
      setError('');
    } catch (err) {
      console.error('Like error:', err);
      setError('Failed to like post. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!userData?._id || !newComment.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userData._id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: post._id,
            text: newComment.trim(),
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add comment');
      }

      const updatedComments = await response.json();
      setComments(Array.isArray(updatedComments) ? updatedComments : []);
      setNewComment('');
      setError('');
    } catch (err) {
      console.error('Comment error:', err);
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

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
      setError('');
    } catch (error) {
      setError(error.message);
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
      setError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', error);
      setIsDeleting(false);
    }
  };

  const isOwner = userData?._id === post.user?.id;
  const displayName = post.user?.profile?.name || userData?.profile?.name || 'Unknown User';
  const profileImageUrl = post.user?.profile?.profileImageUrl || userData?.profile?.profileImageUrl;
  const postDate = post.createdAt || new Date().toISOString();
  const formattedDate = new Date(postDate).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {profileImageError || !profileImageUrl ? (
            <ProfilePlaceholder />
          ) : (
            <img
              src={profileImageUrl}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover"
              onError={() => setProfileImageError(true)}
            />
          )}
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{displayName}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Edit Post
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50"
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
            className="w-full p-3 border rounded-lg mb-3 min-h-[100px] focus:ring-2 focus:ring-blue-400"
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
        <p className="mb-4 text-gray-800">{post.content?.text}</p>
      )}

      {post.content?.media?.length > 0 && (
        <div className="mb-4">
          {imageError ? (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          ) : (
            <img
              src={post.content.media[0].url}
              alt="Post media"
              className="w-full rounded-lg max-h-96 object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      )}

      <div className="flex items-center space-x-4 mt-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{Array.isArray(likes) ? likes.length : 0}</span>
        </button>
        
        <div className="flex items-center space-x-1 text-gray-500">
          <MessageSquare className="w-5 h-5" />
          <span>{Array.isArray(comments) ? comments.length : 0}</span>
        </div>
      </div>

      <form onSubmit={handleAddComment} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border rounded-lg min-h-[80px] focus:ring-2 focus:ring-blue-400"
          disabled={isSubmittingComment}
        />
        <button
          type="submit"
          disabled={!newComment.trim() || isSubmittingComment}
          className={`mt-2 px-4 py-2 rounded-lg ${
            !newComment.trim() || isSubmittingComment
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSubmittingComment ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="mt-4 space-y-4">
        {Array.isArray(comments) && comments.map((comment) => (
          <div key={comment._id} className="flex items-start space-x-3">
            {comment.user?.profileImageUrl ? (
              <img
                src={comment.user.profileImageUrl}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">U</span>
              </div>
            )}
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <p className="font-semibold text-sm">{comment.user?.name}</p>
              <p className="text-gray-700">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;