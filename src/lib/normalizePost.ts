import { Post, WPTerm } from "@/app/types";

export function getPostCategories(post: Post): WPTerm[] {
  return post._embedded?.["wp:term"]?.[0] ?? [];
}

export function getPostTags(post: Post): WPTerm[] {
  return post._embedded?.["wp:term"]?.[1] ?? [];
}

export function hasTag(post: Post, tagSlug: string): boolean {
  return getPostTags(post).some((tag: WPTerm) => tag.slug === tagSlug);
}

export function getPrimaryCategory(post: Post): WPTerm | undefined {
  return getPostCategories(post)[0]; // WP usually orders intentionally
}
