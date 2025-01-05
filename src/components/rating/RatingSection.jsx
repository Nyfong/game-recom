"use client";

import { useEffect, useState } from "react";

const RatingSection = ({ gameId }) => {
  const [userData, setUserData] = useState({
    userName: "Guest",
    profileImage: "",
    bio: "No bio available.",
    location: "Location not specified.",
    userId: null, // Make sure to include the userId here
  });

  const [comment, setComment] = useState(""); // Comment text
  const [rating, setRating] = useState(0); // Rating value
  const [reviews, setReviews] = useState([]); // Store reviews

  useEffect(() => {
    // Fetch user data from localStorage
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData({
          userName: user.username || "Guest",
          profileImage:
            user.profile?.profileImageUrl ||
            "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
          bio: user.profile?.bio || "No bio available.",
          location: user.profile?.location || "Location not specified.",
          userId: user._id || null, // Ensure _id is stored as userId
        });
      }
    } catch (error) {
      console.error("Failed to retrieve user data:", error);
    }

    // Fetch reviews for the specific game
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://backend-apigame.onrender.com/api/reviews/${gameId}`
        );
        const data = await response.json();
        if (response.ok) {
          setReviews(data.reviews || []);
        } else {
          console.error("Error fetching reviews:", data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews(); // Fetch reviews on component mount
  }, [gameId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a comment before submitting.");
      return; // Don't submit if the comment is empty
    }

    const { userId } = userData; // Extract userId from userData

    if (!userId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const payload = {
      comment,
      rating,
      gameId, // Include gameId in the payload
      userId, // Include userId in the payload
    };

    try {
      const response = await fetch(
        `https://backend-apigame.onrender.com/api/updategame/${gameId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Comment submitted successfully", data);
        setComment(""); // Clear the comment input
        setRating(0); // Reset the rating
        setReviews([...reviews, data.review]); // Add new review to the list
      } else {
        console.error("Error submitting comment:", data);
        alert(`Error: ${data.message || "Unable to submit comment"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error, please try again later.");
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 p-4">
        {/* User Avatar and Details */}
        <div className="flex flex-col gap-2 p-2">
          <div className="avatar placeholder flex gap-2 items-center">
            <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full flex items-center justify-center">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt={userData.userName}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src =
                      "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
                  }}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-xs">
                  {userData.userName[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <span>{userData.userName}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default RatingSection;
