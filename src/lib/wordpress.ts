const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL!;

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
};

export async function getPosts(): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_BASE_URL}/wp-json/wp/v2/posts?per_page=10&_embed`,
    {
      next: { revalidate: 60 }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostBySlug(
  slug: string
): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_BASE_URL}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { cache: "no-store" } // critical for dynamic article pages
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();
  return posts.length ? posts[0] : null;
}
