import { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxNnyF4AGTTk_bQKsjiuoOwAenxDG3rv9wmYk70kG-_xQ3MvXquK72OrzEVDvf0GrJp/exec";

const PRODUCTS = [
  "Evaara",
  "Skyro",
  "Lara DX",
  "Inaara",
  "Torino",
  "Primo",
  "Minavra",
];

export default function ReviewForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;

    const data = {
      name: form.name.value,
      rating: "⭐".repeat(rating),
      review: form.review.value,
      product: form.product.value,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });

      setSuccess(true);
      setRating(0);
      form.reset();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-b from-zinc-900 to-black p-8 rounded-2xl shadow-xl mb-16 border border-zinc-800">
      
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src="/logo-white.webp"
          alt="Anthem Logo"
          className="h-12 object-contain"
          draggable={false}
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl text-white font-semibold text-center mb-1">
        Anthem Customer Review
      </h2>
      <p className="text-sm text-zinc-400 text-center mb-6">
        Share your experience with Anthem fans
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <input
          name="name"
          required
          placeholder="Your Name"
          className="w-full p-3 bg-black text-white rounded-lg border border-zinc-700 focus:outline-none focus:border-[#FBB5A9]"
        />

        {/* Product */}
        <select
          name="product"
          required
          className="w-full p-3 bg-black text-white rounded-lg border border-zinc-700 focus:outline-none focus:border-[#FBB5A9]"
        >
          <option value="">Select Product</option>
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Star Rating */}
        <div>
          <p className="text-white mb-2">Your Rating</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  star <= rating
                    ? "text-[#FBB5A9]"
                    : "text-zinc-600 hover:text-[#FBB5A9]"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Review */}
        <textarea
          name="review"
          required
          placeholder="Write your review..."
          rows="4"
          className="w-full p-3 bg-black text-white rounded-lg border border-zinc-700 focus:outline-none focus:border-[#FBB5A9]"
        />

        {/* Submit */}
        <button
          disabled={loading || rating === 0}
          className="w-full bg-[#FBB5A9] text-black py-3 rounded-lg font-semibold tracking-wide hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        {success && (
          <p className="text-green-400 text-center text-sm mt-2">
            Review submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}
