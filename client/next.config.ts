// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:shortId",                      // matches /abc, /xyz
        destination: "http://localhost:3001/:shortId", // send to backend
      },
    ];
  },
};

export default nextConfig;
