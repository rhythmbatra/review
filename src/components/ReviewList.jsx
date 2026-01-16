import { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxNnyF4AGTTk_bQKsjiuoOwAenxDG3rv9wmYk70kG-_xQ3MvXquK72OrzEVDvf0GrJp/exec";

const REVIEWS_PER_PAGE = 3;

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(API_URL + "?t=" + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setReviews(sorted);
        setLoading(false);
      })
      .catch(() => {
        setReviews([]);
        setLoading(false);
      });
  }, []);

  /* Loading */
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-14 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-36 bg-zinc-800/60 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <p className="text-center text-zinc-400 mt-14">
        No customer reviews yet
      </p>
    );
  }

  const start = page * REVIEWS_PER_PAGE;
  const end = start + REVIEWS_PER_PAGE;
  const visibleReviews = reviews.slice(start, end);
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  return (
    <div className="max-w-5xl mx-auto mt-16">
      <h2 className="text-3xl text-white text-center mb-8">
        Customer Reviews
      </h2>

      {/* Reviews */}
      <div className="space-y-4">
        {visibleReviews.map((r, i) => (
          <div
            key={i}
            className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-[#FBB5A9] text-black flex items-center justify-center font-bold uppercase">
                {r.name?.charAt(0)}
              </div>

              <div>
                <h3 className="text-white font-medium">
                  {r.name}
                </h3>
                <div className="text-[#FBB5A9] text-sm">
                  {r.rating}
                </div>
              </div>
            </div>

            {/* Review */}
            <p className="text-zinc-300 text-sm leading-relaxed">
              {r.review}
            </p>

            {/* Footer */}
            <div className="flex justify-between items-center mt-3 text-xs text-zinc-500">
              {r.product && (
                <span className="px-2 py-1 rounded-full bg-zinc-800 text-[#FBB5A9]">
                  {r.product}
                </span>
              )}
              {r.date && (
                <span>
                  {new Date(r.date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {reviews.length > REVIEWS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-5 py-2 rounded-lg border border-zinc-700 text-white hover:border-[#FBB5A9] disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-zinc-400 text-sm">
            {page + 1} / {totalPages}
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-5 py-2 rounded-lg border border-zinc-700 text-white hover:border-[#FBB5A9] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
