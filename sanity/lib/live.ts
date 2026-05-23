import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

const { sanityFetch: liveSanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    // Live API requires useCdn: false and perspective: 'published'
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-05-22",
  }),
  browserToken: token,
  serverToken: token,
});

export const sanityFetch = async <QueryResponse = any>(
  options: Parameters<typeof liveSanityFetch>[0]
) => {
  const res = await liveSanityFetch(options);
  return { ...res, data: res.data as QueryResponse };
};

export { SanityLive };
