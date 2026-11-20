import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@langchain/langgraph", "@langchain/groq", "langchain"],
};

export default nextConfig;
