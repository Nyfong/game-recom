"use client";
import React, { useState } from 'react';
import { FaImage, FaTimes, FaSpinner } from 'react-icons/fa';

const CreatePost = ({ userName, userAvatar, onSubmit }) => {
  const [text, setText] = useState('');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            0.7
          );
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  };

  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      try {
        const compressedBlob = await compressImage(file);
        setMediaFile(compressedBlob);

        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(compressedBlob);
        setError('');
      } catch (err) {
        setError('Error processing image. Please try again.');
        console.error('Error processing image:', err);
        setMediaFile(null);
        setMediaPreview(null);
      }
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Validate text
    if (!text.trim()) {
      setError('Post text is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('text', text.trim());

      if (mediaFile) {
        formData.append('media', mediaFile);
      }

      const tagArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      formData.append('tags', JSON.stringify(tagArray));

      // Log the FormData contents for debugging
      console.log('Form data being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const result = await onSubmit(formData);
      console.log('Post created successfully:', result);

      // Clear form
      setText('');
      setTags('');
      setMediaFile(null);
      setMediaPreview(null);
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message || 'Error creating post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={userAvatar}
          alt={userName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold">{userName}</span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags (comma separated)"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {mediaPreview && (
          <div className="relative">
            <img
              src={mediaPreview}
              alt="Preview"
              className="max-h-60 rounded-lg mx-auto"
            />
            <button
              type="button"
              onClick={removeMedia}
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <label className="cursor-pointer text-blue-500 hover:text-blue-600">
            <FaImage className="text-xl" />
            <input
              type="file"
              accept="image/*"
              onChange={handleMediaChange}
              className="hidden"
              aria-label="Upload media"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className={`px-4 py-2 rounded-lg flex items-center ${
              isSubmitting || !text.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isSubmitting && <FaSpinner className="animate-spin mr-2" />}
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;