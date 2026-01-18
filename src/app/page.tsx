import { getPosts } from "@/lib/wordpress";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="font-headline mb-8">Latest News</h1>

      <div className="grid gap-8">
        {posts.map(post => (
          <article key={post.id} className="border-b border-gray-100 pb-8">
            <a
              href={`/article/${post.slug}`}
              className="font-subheading text-blue-600 hover:underline block mb-2"
            >
              {post.title.rendered}
            </a>

            <div
              className="font-paragraph text-gray-700"
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered
              }}
            />
            
            <span className="font-accent text-sm text-gray-500 mt-2 block">
              Featured Story
            </span>
          </article>
        ))}
      </div>
    </main>
  );
}
