import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-8 mb-6">
      <div className="relative w-full max-w-2xl">
        <label htmlFor="city" className="sr-only">City</label>
        <input
          id="city"
          name="city"
          aria-label="City name"
          type="text"
          placeholder="Search for a city... (e.g., London, New York, Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-6 py-4 pr-32 text-gray-800 bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-200 text-lg placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-full font-semibold text-white shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </span>
        </button>
      </div>
    </form>
  );
}
