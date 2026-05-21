import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Wrap fetch to catch errors during build with invalid project ID
const originalFetch = client.fetch.bind(client);
(client as any).fetch = async (...args: any[]) => {
  try {
    return await (originalFetch as any)(...args);
  } catch (error) {
    console.warn("Sanity fetch failed:", error);
    return null;
  }
};

// Preview client without CDN cache
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
