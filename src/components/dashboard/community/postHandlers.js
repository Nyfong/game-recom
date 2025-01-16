const API_BASE_URL = "https://backend-apigame.onrender.com/api";

export const fetchPosts = async (setPosts, setIsLoading, setError) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to fetch posts");
    }

    const data = await response.json();
    setPosts(data.posts); // Assuming the response has a `posts` array
    setIsLoading(false);
  } catch (err) {
    console.error("Fetch error:", err);
    setError(err.message);
    setIsLoading(false);
  }
};

export const handleAddNew = (setSelectedPost, setImageFile, setIsAddMode, setIsModalOpen) => {
  setSelectedPost({
    content: {
      text: "",
      media: [],
    },
    status: {
      visibility: "public",
      likes: 0,
      comments: [],
    },
    tags: [],
    userId: "logged-in-user-id", // Replace with the logged-in user's ID
  });
  setImageFile(null);
  setIsAddMode(true);
  setIsModalOpen(true);
};

export const handleSave = async (selectedPost, imageFile, tags, setPosts, setIsModalOpen, setImageFile, setError, setIsLoading) => {
  try {
    if (!selectedPost.content.text || !selectedPost.userId) {
      throw new Error("Post content and user ID are required");
    }

    const postData = {
      content: {
        text: selectedPost.content.text,
        media: selectedPost.content.media || [],
      },
      tags: tags || [],
      userId: selectedPost.userId,
    };

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const { url } = await uploadResponse.json();
      postData.content.media.push({ type: "image", url });
    }

    const response = await fetch(
      `${API_BASE_URL}/users/${selectedPost.userId}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create post");
    }

    const newPost = await response.json();
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setIsModalOpen(false);
    setImageFile(null);
  } catch (err) {
    setError(err.message);
    console.error("Save error:", err);
  }
};

export const handleEdit = (post, setSelectedPost, setIsAddMode, setIsModalOpen) => {
  setSelectedPost({ ...post });
  setIsAddMode(false);
  setIsModalOpen(true);
};

export const handleDelete = async (postId, setPosts, setError) => {
  try {
    const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to delete post");
    }
    await fetchPosts(setPosts, setIsLoading, setError);
  } catch (err) {
    console.error("Delete error:", err);
    setError(err.message);
  }
};

export const handleApprove = async (postId, setPosts, setError) => {
  try {
    const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts/${postId}/approve`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to approve post");
    }
    await fetchPosts(setPosts, setIsLoading, setError);
  } catch (err) {
    console.error("Approve error:", err);
    setError(err.message);
  }
};

export const handleDisapprove = async (postId, setPosts, setError) => {
  try {
    const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts/${postId}/disapprove`,
      {
        method: "PUT", // Change method to PUT
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to disapprove post");
    }
    await fetchPosts(setPosts, setIsLoading, setError);
  } catch (err) {
    console.error("Disapprove error:", err);
    setError(err.message);
  }
};

export const handleLike = async (postId, setPosts, setError) => {
  try {
    const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts/${postId}/like`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to like post");
    }
    await fetchPosts(setPosts, setIsLoading, setError);
  } catch (err) {
    console.error("Like error:", err);
    setError(err.message);
  }
};

export const handleAddComment = async (postId, newComment, setPosts, setError) => {
  try {
    if (!newComment.trim()) {
      throw new Error("Comment cannot be empty");
    }

    const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newComment }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to add comment");
    }
    await fetchPosts(setPosts, setIsLoading, setError);
  } catch (err) {
    console.error("Comment error:", err);
    setError(err.message);
  }
};

export const handleDeleteComment = async (postId, commentId, setPosts, setError) => {
  try {
    const userId = "logged-in-user-id"; // Replace with the logged-in user's ID
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to delete comment");
    }
    await fetchPosts(setPosts, setIsLoading, setError);
  } catch (err) {
    console.error("Delete comment error:", err);
    setError(err.message);
  }
};
