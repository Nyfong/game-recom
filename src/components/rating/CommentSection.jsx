"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Star, MessageCircle, Loader } from "lucide-react";

const CommentSection = ({ gameId, existingReviews = [] }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(existingReviews);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            userId: null,
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
      </div>

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
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
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
              </div>
            ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No reviews yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentSection;
