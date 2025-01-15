import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Star, MessageCircle, Loader, Trash } from "lucide-react";

const CommentSection = ({ gameId, existingReviews = [] }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(existingReviews);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState(null);
  const [usersMap, setUsersMap] = useState({});

  // Fetch current user data from localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // Fetch user data by userId and update the users map
  const fetchUserById = async (userId) => {
    if (usersMap[userId]) return; // Avoid fetching the same user multiple times
    try {
      const response = await fetch(
        `https://backend-apigame.onrender.com/api/users/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch user data");
      const user = await response.json();
      setUsersMap((prevMap) => ({
        ...prevMap,
        [userId]: {
          name: user.profile?.name || user.username || "Unknown User",
          avatar:
            user.profile?.profileImageUrl ||
            "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg", // Default avatar
          bio: user.profile?.bio || "No bio available",
          location: user.profile?.location || "Unknown location",
        },
      }));
    } catch (err) {
      console.error(`Error fetching user with ID ${userId}:`, err);
      setUsersMap((prevMap) => ({
        ...prevMap,
        [userId]: {
          name: "Unknown User",
          avatar:
            "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
          bio: "",
          location: "",
        },
      }));
    }
  };

  // Fetch all users mentioned in existing reviews
  useEffect(() => {
    const uniqueUserIds = [
      ...new Set(existingReviews.map((review) => review.userId)),
    ];
    uniqueUserIds.forEach(fetchUserById);
  }, [existingReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData?._id) {
      setError("Please login to submit a review");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        reviews: [
          ...reviews,
          {
            userId: userData._id,
            rating: rating,
            comment: comment.trim(),
            createdAt: new Date().toISOString(),
          },
        ],
      };

      const response = await fetch(
        `https://backend-apigame.onrender.com/api/updategame/${gameId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server response:", errorData);
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setReviews(result.reviews || []);
      setComment("");
      setRating(0);
      setError("");
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete review function
  const handleDeleteReview = async (reviewId) => {
    if (!userData?._id) {
      setError("Please login to delete a review");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (!confirmDelete) return;

    setIsSubmitting(true);

    try {
      const updatedReviews = reviews.filter(
        (review) => review._id !== reviewId
      );

      const response = await fetch(
        `https://backend-apigame.onrender.com/api/updategame/${gameId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify({ reviews: updatedReviews }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server response:", errorData);
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setReviews(result.reviews || []);
      setError("");
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to delete review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        onClick={interactive ? () => setRating(index + 1) : undefined}
        onMouseEnter={interactive ? () => setRating(index + 1) : undefined}
        className={`h-6 w-6 ${
          interactive ? "cursor-pointer transform hover:scale-110" : ""
        } ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        } transition-all duration-150`}
      />
    ));
  };

  return (
    <Card className="mt-4 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-800">Game Reviews</h3>
        {userData && (
          <div className="text-sm text-gray-600 ml-auto flex gap-2">
            <span>Logged in as:</span>
            <span className="font-semibold">
              {usersMap[userData._id]?.name || "Loading..."}
            </span>
          </div>
        )}
      </div>

      {/* Display the user's profile information */}
      {userData && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              src={usersMap[userData._id]?.avatar}
              alt="User Avatar"
              className="w-14 h-14 rounded-full object-cover border-green-400 border-2"
            />
            <div>
              <p className="font-medium text-gray-800">
                {usersMap[userData._id]?.name}
              </p>
            </div>
          </div>
        </div>
      )}

      {!userData?._id ? (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Please login to submit a review</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-medium text-gray-700">
                Your Rating
              </label>
              <div className="flex gap-1">{renderStars(rating, true)}</div>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50 hover:bg-white"
              placeholder="Share your thoughts about this game..."
              rows="4"
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>•</span> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
        {reviews && reviews.length > 0 ? (
          reviews
            .slice()
            .reverse()
            .map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 animate-fadeIn"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        usersMap[review.userId]?.avatar ||
                        "https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {usersMap[review.userId]?.name || "Loading..."}{" "}
                      </p>
                      <p className="text-sm text-gray-600">
                        {usersMap[review.userId]?.location ||
                          "Unknown location"}
                      </p>
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed break-words">
                  {review.comment}
                </p>
                {/* Display Delete Button */}
                {review.userId === userData?._id && (
                  <div className="flex items-center mt-2 gap-3">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-500 flex items-center gap-1 hover:text-red-600"
                    >
                      <Trash className="w-5 h-5" /> Delete
                    </button>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No reviews yet</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentSection;
