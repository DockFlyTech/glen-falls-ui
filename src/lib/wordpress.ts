import { Post, WPMedia } from "@/app/types";

const WP_BASE_DOMAIN = process.env.NEXT_PUBLIC_WP_BASE_URL!;
const WP_BASE_URL = `${WP_BASE_DOMAIN}/wp-json/wp/v2`;

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${WP_BASE_URL}/posts?per_page=10&_embed`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(
    `${WP_BASE_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { cache: "no-store" } // critical for dynamic article pages
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();
  return posts.length ? posts[0] : null;
}

export async function getLatestFrontPagePdf(): Promise<WPMedia | null> {
  try {
    const url = `${WP_BASE_URL}/media?mime_type=application/pdf&search=front&page=1&per_page=1&orderby=date&order=desc`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const media = await res.json();
    return media.length ? media[0] : null;
  } catch (e) {
    console.error("Error fetching front page PDF:", e);
    return null;
  }
}

export async function getHomepagePosts(): Promise<Post[]> {
  const res = await fetch(`${WP_BASE_URL}/posts?_embed&per_page=20`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch homepage posts");
  }

  return res.json();
}
