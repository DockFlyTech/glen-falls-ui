import { FrontPagePreviewMedia, Post } from "@/app/types";
import { PAGE_SLUGS } from "@/constants/taxonomy";

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

export async function getLatestFrontPageMedia(): Promise<FrontPagePreviewMedia> {
  try {
    const imageUrl = `${WP_BASE_URL}/media?media_type=image&search=front&page=1&per_page=1&orderby=date&order=desc`;
    const pdfUrl = `${WP_BASE_URL}/media?mime_type=application/pdf&search=front&page=1&per_page=1&orderby=date&order=desc`;

    const [imageRes, pdfRes] = await Promise.all([
      fetch(imageUrl, { cache: "no-store" }),
      fetch(pdfUrl, { cache: "no-store" }),
    ]);

    const imageJson = imageRes.ok ? await imageRes.json() : [];
    const pdfJson = pdfRes.ok ? await pdfRes.json() : [];

    return {
      image: imageJson.length ? imageJson[0] : null,
      pdf: pdfJson.length ? pdfJson[0] : null,
    };
  } catch (e) {
    console.error("Error fetching front page media:", e);
    return { image: null, pdf: null };
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

export async function getOurStoryPage(): Promise<Post | null> {
  try {
    const res = await fetch(
      `${WP_BASE_URL}/pages?_embed&slug=${PAGE_SLUGS.ABOUT}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const pages = await res.json();

    return pages.length ? pages[0] : null;
  } catch (e) {
    console.error("Error fetching Our Story page:", e);
    return null;
  }
}
