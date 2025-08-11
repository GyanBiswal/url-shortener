"use client";
import { useState } from "react";

export default function Home() {
  const [longURL, setLongUrl] = useState("");
  const [shortURL, setShortUrl] = useState("");
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [retrievedLongUrl, setRetrievedLongUrl] = useState("");
  const [error, setError] = useState<string>("");

  const handleGenerateShortUrl = async () => {
    try {
      const response = await fetch("http://localhost:3001/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalURL: longURL }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedShortUrl(data["data"]);
        setError("");
      } else {
        setError("Failed to generate short URL");
        setGeneratedShortUrl("");
      }
    } catch (error) {
      console.log(error);
      setError("Internal error");
      setGeneratedShortUrl("");
    }
  };

  const handleRetrieveLongUrl = async () => {
    if (!shortURL) {
      setError("Please enter a short URL ID");
      setRetrievedLongUrl("");
      return;
    }
    setError("");
    setRetrievedLongUrl("");

    try {
      const response = await fetch(`http://localhost:3001/${shortURL}`);
      if (!response.ok) {
        setError("Short URL not found");
        return;
      }

      const data = await response.json();
      setRetrievedLongUrl(data.originalUrl || data.data || "");
    } catch (err) {
      console.log(err);
      setError("Failed to retrieve long URL");
      setRetrievedLongUrl("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 font-serif">
        Welcome to Url-Shortener👋
      </h1>

      {/* Generate a new Short URL */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>

        <input
          type="text"
          placeholder="Enter Long URL"
          value={longURL}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2"
          onClick={handleGenerateShortUrl}
        >
          Generate Short URL
        </button>

        {generatedShortUrl && (
          <p className="mt-4 text-green-400 break-words">
            Short URL:{" "}
            <a
              href={generatedShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {generatedShortUrl}
            </a>
          </p>
        )}
      </div>

      {/* Retrieve Long URL */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Get your Long URL</h2>

        <input
          type="text"
          placeholder="Enter Short URL ID"
          value={shortURL}
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-4 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
          onClick={handleRetrieveLongUrl}
        >
          Get Long URL
        </button>

        {retrievedLongUrl && (
          <p className="mt-4 text-green-400 break-words">
            Original URL:{" "}
            <a
              href={retrievedLongUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {retrievedLongUrl}
            </a>
          </p>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
