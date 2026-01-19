import { Post } from "@/app/types";
import { hasTag } from "@/lib/normalizePost";
import { TAGS } from "@/constants/taxonomy";

/**
 * Checks if a WordPress post has a featured image embedded.
 */
export function hasFeaturedImage(post: Post): boolean {
  const featuredMedia = post._embedded?.["wp:featuredmedia"];
  return !!(
    featuredMedia &&
    featuredMedia.length > 0 &&
    featuredMedia[0].source_url
  );
}

/**
 * Filters an array of posts to only include those with featured images.
 */
export function filterPostsWithImages(posts: Post[]): Post[] {
  return posts.filter(hasFeaturedImage);
}

/**
 * Safely extracts the featured image URL from a post.
 */
export function getFeaturedImageUrl(post: Post): string | undefined {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
}

/**
 * Safely extracts the author name from a post.
 */
export function getAuthorName(post: Post, fallback: string = "Staff"): string {
  return post._embedded?.author?.[0]?.name || fallback;
}

/**
 * Gets a specific number of recent posts that have featured images,
 * optionally skipping a number of leading posts (like the main featured one).
 */
export function getPostsWithImages(
  posts: Post[],
  limit: number = 5,
  skip: number = 1
): Post[] {
  return filterPostsWithImages(posts.slice(skip)).slice(0, limit);
}

/**
 * Formats a WordPress date string into a human-readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Filters posts by a specific tag slug.
 */
export function filterPostsByTag(posts: Post[], tagSlug: string): Post[] {
  return posts.filter(post => hasTag(post, tagSlug));
}

/**
 * Gets trending posts from a list of posts.
 */
export function getTrendingPosts(posts: Post[]): Post[] {
  return filterPostsByTag(posts, TAGS.TRENDING);
}
