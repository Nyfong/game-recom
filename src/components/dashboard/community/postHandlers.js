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
    setPosts(data.posts || []);
    setIsLoading(false);
  } catch (err) {
    console.error("Fetch error:", err);
    setError(err.message);
    setIsLoading(false);
  }
};

export const handleSave = async (selectedPost, imageFile, tags, setPosts, setIsModalOpen, setImageFile, setError, setIsLoading) => {
  try {
    const postData = {
      content: {
        text: selectedPost.content.text,
        media: selectedPost.content.media || [],
      },
      tags,
      status: selectedPost.status,
    };

    if (imageFile) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(imageFile);
      });

      postData.content.media.push({
        type: "image",
        url: base64,
        altText: "User uploaded image",
      });
    }

    const response = await fetch(
      selectedPost._id
        ? `${API_BASE_URL}/users/${selectedPost.userId}/posts/${selectedPost._id}`
        : `${API_BASE_URL}/users/${selectedPost.userId}/postID`,
      {
        method: selectedPost._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to ${selectedPost._id ? "update" : "add"} post`);
    }

    await fetchPosts(setPosts, setIsLoading, setError);
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
    const response = await fetch(`${API_BASE_URL}/users/${postId}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

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
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/approve`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

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
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/disapprove`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

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
