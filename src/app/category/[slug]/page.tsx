import { 
  getCategoryBySlug, 
  getPostsByCategory, 
  getPosts
} from "@/lib/wordpress";
import { PostListLayout } from "@/components/listings/PostListLayout";
import { ContentNotFound } from "@/components/ContentNotFound";
import { Post } from "@/app/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let posts: Post[] = [];
  let title = "";

  if (slug === "latest") {
    posts = await getPosts();
    title = "Latest News";
  } else {
    const category = await getCategoryBySlug(slug);
    if (category) {
      posts = await getPostsByCategory(category.id, 20);
      title = category.name;
    }
  }

  if (!title) {
    return (
      <ContentNotFound 
        title="Category Not Found" 
        message={`We couldn't find the category '${slug}'.`} 
      />
    );
  }

  return <PostListLayout title={title} posts={posts} />;
}
