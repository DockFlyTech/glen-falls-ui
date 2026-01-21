import {
  getTagBySlug,
  getPostsByTag,
} from "@/lib/wordpress";
import { PostListLayout } from "@/components/listings/PostListLayout";
import { ContentNotFound } from "@/components/ContentNotFound";
import { Post } from "@/app/types";

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let posts: Post[] = [];
  let title = "";

  // Try tag first for the /tag route
  const tag = await getTagBySlug(slug);
  if (tag) {
    posts = await getPostsByTag(tag.id, 20);
    title = tag.name;
  }

  if (!title) {
    return (
      <ContentNotFound
        title="Tag Not Found"
        message={`We couldn't find the tag '${slug}'.`}
      />
    );
  }

  return <PostListLayout title={title} posts={posts} />;
}
