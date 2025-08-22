// // "use client";
// // import { useState } from "react";

// // export default function Home() {
// //   const [longURL, setLongUrl] = useState("");
// //   const [shortURL, setShortUrl] = useState("");
// //   const [generatedShortUrl, setGeneratedShortUrl] = useState("");
// //   const [error, setError] = useState<string>("");

// //   // Generate short URL
// //   const handleGenerateShortUrl = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3001/shorten", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ originalURL: longURL }),
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         setGeneratedShortUrl(data.data);
// //         setError("");
// //       } else {
// //         setError("Failed to generate short URL");
// //         setGeneratedShortUrl("");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       setError("Internal error");
// //       setGeneratedShortUrl("");
// //     }
// //   };

// //   // Redirect to long URL
// //   const handleRedirectToLongUrl = () => {
// //     if (!shortURL) {
// //       setError("Please enter a short URL ID");
// //       return;
// //     }
// //     setError("");
// //     // Redirect browser to the short URL
// //     window.location.href = `http://localhost:3001/${shortURL}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
// //       <h1 className="text-3xl font-bold mb-8 font-serif">
// //         Welcome to Url-Shortener👋
// //       </h1>

// //       {/* Generate a new Short URL */}
// //       <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
// //         <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>

// //         <input
// //           type="text"
// //           placeholder="Enter Long URL"
// //           value={longURL}
// //           onChange={(e) => setLongUrl(e.target.value)}
// //           className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
// //         />
// //         <button
// //           className="w-full mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2"
// //           onClick={handleGenerateShortUrl}
// //         >
// //           Generate Short URL
// //         </button>

// //         {generatedShortUrl && (
// //           <p className="mt-4 text-green-400 break-words">
// //             Short URL:{" "}
// //             <a
// //               href={generatedShortUrl}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="underline"
// //             >
// //               {generatedShortUrl}
// //             </a>
// //           </p>
// //         )}
// //       </div>

// //       {/* Redirect to original URL */}
// //       <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
// //         <h2 className="text-xl font-semibold mb-4">Go to Original URL</h2>

// //         <input
// //           type="text"
// //           placeholder="Enter Short URL ID"
// //           value={shortURL}
// //           onChange={(e) => setShortUrl(e.target.value)}
// //           className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
// //         />
// //         <button
// //           className="w-full mt-4 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
// //           onClick={handleRedirectToLongUrl}
// //         >
// //           Go to Original URL
// //         </button>

// //         {error && <p className="mt-4 text-red-500">{error}</p>}
// //       </div>
// //     </div>
// //   );
// // }




// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [longURL, setLongUrl] = useState("");
//   const [shortURL, setShortUrl] = useState("");
//   const [generatedShortUrl, setGeneratedShortUrl] = useState("");
//   const [error, setError] = useState<string>("");

//   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";



//   // Generate short URL
//   const handleGenerateShortUrl = async () => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/shorten`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ originalURL: longURL }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setGeneratedShortUrl(data.data);
//         setError("");
//       } else {
//         setError("Failed to generate short URL");
//         setGeneratedShortUrl("");
//       }
//     } catch (error) {
//       console.log(error);
//       setError("Internal error");
//       setGeneratedShortUrl("");
//     }
//   };

//   // Redirect to long URL
//   const handleRedirectToLongUrl = () => {
//     if (!shortURL) {
//       setError("Please enter a short URL ID");
//       return;
//     }
//     setError("");
//     // Redirect browser to the short URL
//     window.location.href = `${BACKEND_URL}/${shortURL}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold mb-8 font-serif">
//         Welcome to Url-Shortener👋
//       </h1>

//       {/* Generate a new Short URL */}
//       <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>

//         <input
//           type="text"
//           placeholder="Enter Long URL"
//           value={longURL}
//           onChange={(e) => setLongUrl(e.target.value)}
//           className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
//         />
//         <button
//           className="w-full mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2"
//           onClick={handleGenerateShortUrl}
//         >
//           Generate Short URL
//         </button>

//         {generatedShortUrl && (
//           <p className="mt-4 text-green-400 break-words">
//             Short URL:{" "}
//             <a
//               href={generatedShortUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               {generatedShortUrl}
//             </a>
//           </p>
//         )}
//       </div>

//       {/* Redirect to original URL */}
//       <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Go to Original URL</h2>

//         <input
//           type="text"
//           placeholder="Enter Short URL ID"
//           value={shortURL}
//           onChange={(e) => setShortUrl(e.target.value)}
//           className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
//         />
//         <button
//           className="w-full mt-4 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
//           onClick={handleRedirectToLongUrl}
//         >
//           Go to Original URL
//         </button>

//         {error && <p className="mt-4 text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// }





// trial



// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [longURL, setLongUrl] = useState("");
//   const [shortURL, setShortUrl] = useState("");
//   const [generatedShortUrl, setGeneratedShortUrl] = useState("");
//   const [error, setError] = useState<string>("");

//   // Generate short URL
//   const handleGenerateShortUrl = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/shorten", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ originalURL: longURL }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setGeneratedShortUrl(data.data);
//         setError("");
//       } else {
//         setError("Failed to generate short URL");
//         setGeneratedShortUrl("");
//       }
//     } catch (error) {
//       console.log(error);
//       setError("Internal error");
//       setGeneratedShortUrl("");
//     }
//   };

//   // Redirect to long URL
//   const handleRedirectToLongUrl = () => {
//     if (!shortURL) {
//       setError("Please enter a short URL ID");
//       return;
//     }
//     setError("");
//     // Redirect browser to the short URL
//     window.location.href = `http://localhost:3001/${shortURL}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold mb-8 font-serif">
//         Welcome to Url-Shortener👋
//       </h1>

//       {/* Generate a new Short URL */}
//       <div className="w-full max-w-md bg-gray-800 rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-4">Generate Short URL</h2>

//         <input
//           type="text"
//           placeholder="Enter Long URL"
//           value={longURL}
//           onChange={(e) => setLongUrl(e.target.value)}
//           className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
//         />
//         <button
//           className="w-full mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 text-white py-2"
//           onClick={handleGenerateShortUrl}
//         >
//           Generate Short URL
//         </button>

//         {generatedShortUrl && (
//           <p className="mt-4 text-green-400 break-words">
//             Short URL:{" "}
//             <a
//               href={generatedShortUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               {generatedShortUrl}
//             </a>
//           </p>
//         )}
//       </div>

//       {/* Redirect to original URL */}
//       <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Go to Original URL</h2>

//         <input
//           type="text"
//           placeholder="Enter Short URL ID"
//           value={shortURL}
//           onChange={(e) => setShortUrl(e.target.value)}
//           className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
//         />
//         <button
//           className="w-full mt-4 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
//           onClick={handleRedirectToLongUrl}
//         >
//           Go to Original URL
//         </button>

//         {error && <p className="mt-4 text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";

export default function Home() {
  const [longURL, setLongUrl] = useState("");
  const [shortURL, setShortUrl] = useState("");
  const [generatedShortUrl, setGeneratedShortUrl] = useState("");
  const [error, setError] = useState<string>("");

  // Generate short URL
  const handleGenerateShortUrl = async () => {
    if (!longURL) {
      setError("Please enter a URL to shorten");
      return;
    }

    try {
      const response = await fetch(`/api/proxy/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalURL: longURL }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", response.status, text);
        setError(`Server error: ${response.status}`);
        return;
      }

      const data = await response.json();
      // Use the proxy route for clickable short URL
      const shortId = data.data.split("/").pop(); // get the last part
      setGeneratedShortUrl(`${window.location.origin}/api/proxy/${shortId}`);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Internal error");
      setGeneratedShortUrl("");
    }
  };

  // Redirect to long URL
  const handleRedirectToLongUrl = () => {
    if (!shortURL) {
      setError("Please enter a short URL ID");
      return;
    }
    setError("");
    // Redirect through proxy
    window.location.href = `/api/proxy/${shortURL}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 font-serif">
        Welcome to Url-Shortener 👋
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

      {/* Redirect to original URL */}
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Go to Original URL</h2>

        <input
          type="text"
          placeholder="Enter Short URL ID"
          value={shortURL}
          onChange={(e) => setShortUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200"
        />
        <button
          className="w-full mt-4 bg-red-600 rounded-lg hover:bg-red-700 text-white py-2"
          onClick={handleRedirectToLongUrl}
        >
          Go to Original URL
        </button>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
