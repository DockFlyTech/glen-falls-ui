import { Post } from "@/app/types";
import { ArticlePreview } from "@/components/ArticlePreview";

interface PostListLayoutProps {
  title: string;
  posts: Post[];
}

export function PostListLayout({ title, posts }: PostListLayoutProps) {
  return (
    <main className="max-w-[1400px] mx-auto px-4 py-12">
      <header className="mb-12 border-b-4 border-black pb-4">
        <h1 className="text-5xl font-merriweather font-black uppercase tracking-tight text-black">
          {title}
        </h1>
      </header>

      <div className="flex flex-col">
        {posts.length > 0 ? (
          posts.map((post) => (
            <ArticlePreview key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500 font-merriweather italic py-12 text-center">
            No articles found in this section.
          </p>
        )}
      </div>
    </main>
  );
}
