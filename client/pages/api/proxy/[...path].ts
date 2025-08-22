import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const backendBase = "http://url-shortener-v1-env.eba-umtm5h2m.ap-south-1.elasticbeanstalk.com";
  const path = Array.isArray(req.query.path)
    ? req.query.path.join("/")
    : req.query.path || "";

  try {
    const response = await fetch(`${backendBase}/${path}`, {
      method: req.method,
      headers: { "Content-Type": req.headers["content-type"] || "application/json" },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
}
