import { useState } from "react";
import ReviewForm from "./components/ReactForm";
import ReviewList from "./components/ReviewList";

export default function Review() {
  const [reviews, setReviews] = useState([]);

  return (
    <div className="bg-black min-h-screen py-10">
      <ReviewForm onNewReview={(review) =>
        setReviews((prev) => [review, ...prev])
      } />
      <ReviewList reviews={reviews} setReviews={setReviews} />
    </div>
  );
}
