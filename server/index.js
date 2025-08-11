import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { encodeBase62 } from "./services/base_62_encoding_service.js";

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Redis client
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Redis is connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Connection Failed:", err);
});

// Shorten a long URL
app.post("/shorten", async (req, res) => {
  let originalURL = req.body["originalURL"];
  console.log("Received body:", req.body);

  if (!originalURL) {
    return res.status(400).json({
      status: false,
      error: "Please pass the Long URL",
    });
  }

  // Normalize: ensure it has http/https
  if (!/^https?:\/\//i.test(originalURL)) {
    originalURL = "https://" + originalURL;
  }

  try {
    const id = await redisClient.incr("global_counter");
    const shortUrlId = encodeBase62(id);

    await redisClient.hSet("urls", shortUrlId, originalURL);

    res.json({
      status: true,
      data: `${req.protocol}://${req.get("host")}/${shortUrlId}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      error: "Internal server error",
    });
  }
});

// Redirect from short URL to original
app.get("/:shortUrlId", async (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  console.log("Received shortUrlId:", shortUrlId);

  try {
    const originalUrl = await redisClient.hGet("urls", shortUrlId);
    console.log("Lookup result:", originalUrl);

    if (!originalUrl) {
      console.log("URL not found for:", shortUrlId);
      return res.status(404).send("URL not found");
    }

    res.json({ status: true, originalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


// Start server only after Redis is connected
(async () => {
  try {
    await redisClient.connect();
    app.listen(3001, () => {
      console.log("Backend is running on port 3001");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
