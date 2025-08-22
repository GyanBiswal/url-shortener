import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { nanoid } from "nanoid";
import { URL } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Redis client with env variables
const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});



redisClient.on("connect", () => console.log("Redis Cloud connected"));
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

// Shorten a long URL
app.post("/shorten", async (req, res) => {
  let originalURL = req.body.originalURL;
  if (!originalURL)
    return res.status(400).json({ status: false, error: "Please pass the Long URL" });

  // Handle Google redirect URLs
  if (originalURL.includes("google.com/url")) {
    try {
      const urlObj = new URL(originalURL);
      const realURL = urlObj.searchParams.get("url");
      if (realURL) originalURL = decodeURIComponent(realURL);
    } catch (err) {
      console.error("Failed to parse Google redirect URL:", err);
    }
  }

  // Normalize URL
  if (!/^https?:\/\//i.test(originalURL)) originalURL = "https://" + originalURL;

  try {
    // Generate unique random ID and ensure no collision
    let shortUrlId;
    do {
      shortUrlId = nanoid(6); // 6-character random ID
    } while (await redisClient.hExists("urls", shortUrlId));

    await redisClient.hSet("urls", shortUrlId, originalURL);

    res.json({
      status: true,
      data: `${req.protocol}://${req.get("host")}/${shortUrlId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
});

// Redirect from short URL
app.get("/:shortUrlId", async (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  try {
    const originalUrl = await redisClient.hGet("urls", shortUrlId);
    if (!originalUrl) return res.status(404).send("URL not found");

    let urlToRedirect = originalUrl;
    if (!/^https?:\/\//i.test(originalUrl)) urlToRedirect = "https://" + originalUrl;

    res.redirect(urlToRedirect);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Start server after Redis connects
(async () => {
  try {
    await redisClient.connect();
    app.listen(process.env.PORT || 3001, () =>
      console.log(`Backend running on port ${process.env.PORT || 3001}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
